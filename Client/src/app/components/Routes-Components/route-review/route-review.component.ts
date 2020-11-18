import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// SERVICES
import { SchemeService } from '../../../services/scheme.service'; // test-service
import { RoutePreviewService } from '../../../services/Route-Services/route-preview.service';

// MODELS
import { Scheme } from '../../../models/Scheme'; // test-model
import { RoutePreview } from '../../../models/Routes-Models/RoutePreview';

@Component({
  selector: 'app-route-review',
  templateUrl: './route-review.component.html',
  styleUrls: ['./route-review.component.css'],
})
export class RouteReviewComponent implements OnInit {
  //variables
  public schemes: Scheme[];
  public routePreviews: RoutePreview[];

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService,
    private routePreviewService: RoutePreviewService
  ) {}

  ngOnInit(): void {
    // Get all schemes (test)
    this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
      this.schemes = schemes;
    });
    // Todo: Get all routePreviews
    this.routePreviewService
      .getAllRoutesPreview()
      .subscribe((routePreview: RoutePreview[]) => {
        this.routePreviews = routePreview;
        console.log(routePreview);
      });
  }

  /**
   * Removes a scheme
   * @param routeName to remove
   */
  public onDeleteClick() {
    // Todo delete on service
    console.log('I delete you son');
  }

  /**
   * Removes a scheme
   * @param routeName to patch (update)
   */
  public onToggle(name: string) {
    // Todo: toggle on click
    //console.log();
    console.log(name);
    this.routePreviewService.toggleRoute(name);
  }
}
