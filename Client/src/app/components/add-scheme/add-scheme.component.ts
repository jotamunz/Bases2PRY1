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
  };
  public currentDisplayable: string = '';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    this.scheme.fields = this.schemeFields;
    // TODO: Conectar con el service
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
    this.schemeFields.push(this.currentSchemeField);
    console.log(this.schemeFields);
    this.currentSchemeField = {
      name: '',
      expectType: 'text',
      component: 'textbox',
      displayables: [],
    };
  }
}
