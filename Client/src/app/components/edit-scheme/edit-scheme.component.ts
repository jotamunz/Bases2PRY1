import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeService } from '../../services/scheme.service';
import { SchemeUpdate } from '../../models/SchemeUpdate';

import { Scheme } from '../../models/Scheme';
import { SchemeField } from '../../models/SchemeField';

@Component({
  selector: 'app-edit-scheme',
  templateUrl: './edit-scheme.component.html',
  styleUrls: ['./edit-scheme.component.css'],
})
export class EditSchemeComponent implements OnInit {
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
  };
  public updateScheme: SchemeUpdate = {
    name: '',
    fields: [],
    oldName: '',
  };
  public currentDisplayable: string = '';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private schemeService: SchemeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { schemeName } = params;
      this.schemeService
        .getCompleteScheme(schemeName)
        .subscribe((scheme: Scheme) => {
          this.scheme.name = scheme.name;
          this.schemeFields = scheme.fields;
          this.updateScheme.oldName = scheme.name;
        });
    });
  }

  public onSubmit(): void {
    this.scheme.fields = this.schemeFields;

    this.updateScheme._id = this.scheme._id;
    this.updateScheme.fields = this.scheme.fields;
    this.updateScheme.name = this.scheme.name;
    console.log(this.updateScheme);
    this.schemeService.updateScheme(this.updateScheme).subscribe(
      (response) => {
        this.flashMessagesService.show(
          `${this.updateScheme.name} has been registered`,
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
    this.currentSchemeField.label = this.currentSchemeField.name;
    this.schemeFields.push(this.currentSchemeField);
    this.currentSchemeField = {
      name: '',
      expectType: 'text',
      component: 'textbox',
      displayables: [],
      label: '',
    };
  }
}
