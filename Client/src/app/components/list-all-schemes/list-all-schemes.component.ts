import { Component, OnInit } from '@angular/core';
import { SchemeService } from '../../services/scheme.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Scheme } from '../../models/Scheme';

@Component({
  selector: 'app-list-all-schemes',
  templateUrl: './list-all-schemes.component.html',
  styleUrls: ['./list-all-schemes.component.css'],
})
export class ListAllSchemesComponent implements OnInit {
  public schemes: Scheme[];

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {
    // Get all schemes
    this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
      this.schemes = schemes;
    });
  }

  public onDeleteClick(schemeName: string) {
    this.schemeService.deleteScheme(schemeName).subscribe(
      (response) => {
        this.flashMessagesService.show(
          `${schemeName} has been deleted succesfully`,
          {
            cssClass: 'alert success-alert',
          }
        );
      },
      (err) => {
        this.flashMessagesService.show(err.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
    this.removeScheme(schemeName);
  }

  /**
   * Removes a scheme
   * @param schemeName The name of the scheme to remove
   */
  public removeScheme(schemeName: string): void {
    let schemesTemp = [];
    this.schemes.forEach((scheme) => {
      if (scheme.name != schemeName) {
        schemesTemp.push(scheme);
      }
    });
    this.schemes = schemesTemp;
  }
}
