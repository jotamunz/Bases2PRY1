import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeService } from '../../services/scheme.service';

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
        });
    });
  }

  public onSubmit(): void {
    this.scheme.fields = this.schemeFields;
    console.log(this.scheme);
    // TODO: Conectar con el service
    // TODO: oldname y newname
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
