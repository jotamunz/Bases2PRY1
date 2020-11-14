import { Component, OnInit } from '@angular/core';
import { SchemeService } from '../../services/scheme.service';

import { Scheme } from '../../models/Scheme';

@Component({
  selector: 'app-list-all-schemes',
  templateUrl: './list-all-schemes.component.html',
  styleUrls: ['./list-all-schemes.component.css'],
})
export class ListAllSchemesComponent implements OnInit {
  public schemes: Scheme[];

  constructor(private schemeService: SchemeService) {}

  ngOnInit(): void {
    // Get all schemes
    this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
      this.schemes = schemes;
    });
  }

  public onDeleteClick(schemeName: string) {
    console.log(schemeName);
  }
}
