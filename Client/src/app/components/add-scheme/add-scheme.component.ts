import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SchemeService } from '../../services/scheme.service';

import { Scheme } from '../../models/Scheme';
import { SchemeField } from '../../models/SchemeField';

declare var M: any;

@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrls: ['./add-scheme.component.css'],
})
export class AddSchemeComponent implements OnInit {
  public scheme: Scheme = {
    name: '',
    fields: [],
  };
  public schemeFields: SchemeField[] = [];
  public currentSchemeField: SchemeField = {
    name: '',
    expectType: 'text',
    component: 'textbox',
    displayables: [],
    label: '',
    isRequired: false,
  };
  public currentDisplayable: string = '';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {
    // Initialize dropdowns for forms
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  public onSubmit(): void {
    // Check if name exists
    if (this.scheme.name == '') {
      this.flashMessagesService.show('Please add a name to your scheme', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    // Check if there are scheme fields
    if (this.schemeFields.length == 0) {
      this.flashMessagesService.show('Please add fields to your scheme', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    // Get fields & post scheme
    this.scheme.fields = this.schemeFields;
    this.schemeService.postScheme(this.scheme).subscribe(
      (response) => {
        this.flashMessagesService.show(
          `${this.scheme.name} has been registered`,
          {
            cssClass: 'alert success-alert',
          }
        );
        this.router.navigateByUrl('/admin/schemes');
      },
      (err) => {
        this.flashMessagesService.show(err.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }

  public addDisplayableToField(): void {
    // Check for displayable name
    if (this.currentDisplayable == '') {
      this.flashMessagesService.show('Please add name for your displayable', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    this.currentSchemeField.displayables.push(this.currentDisplayable);
    this.currentDisplayable = '';
  }

  public resetDisplayables(): void {
    this.currentSchemeField.displayables = [];
    this.currentSchemeField.expectType = 'text';
    this.currentDisplayable = '';
  }

  public removeField(index: number): void {
    let fieldsTemp = [];
    this.schemeFields.forEach((field, currentIndex) => {
      if (index != currentIndex) {
        fieldsTemp.push(field);
      }
    });
    this.schemeFields = fieldsTemp;
  }

  public onFieldSubmit(): void {
    // Check for empty field name
    if (this.currentSchemeField.name === '') {
      this.flashMessagesService.show('Please add name for your field', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    // Check if empty displayables for dropdown
    if (
      this.currentSchemeField.component == 'dropdown' &&
      this.currentSchemeField.displayables.length == 0
    ) {
      this.flashMessagesService.show('Please add options for your dropdown', {
        cssClass: 'alert danger-alert',
      });
      return;
    }
    this.currentSchemeField.label = this.currentSchemeField.name;
    this.schemeFields.push(this.currentSchemeField);
    this.currentSchemeField = {
      name: '',
      expectType: 'text',
      component: 'textbox',
      displayables: [],
      label: '',
      isRequired: false,
    };
  }
}
