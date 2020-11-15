import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SchemeService } from '../../services/scheme.service';

import { Scheme } from '../../models/Scheme';
import { SchemeField } from '../../models/SchemeField';

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
    label : ''
  };
  public currentDisplayable: string = '';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    console.log(this.scheme);
    this.scheme.fields = this.schemeFields;
    // TODO: Conectar con el service
    this.schemeService.postScheme(this.scheme).subscribe(response => {
      this.flashMessagesService.show(`${this.scheme.name} has been registered`, {
        cssClass: 'alert success-alert',
      });
      this.router.navigateByUrl('/admin/schemes');
    },
    (err) => {
      this.flashMessagesService.show(err.error.message, {
        cssClass: 'alert danger-alert',
      })
    })
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
      label : ''
    };
  }
}
