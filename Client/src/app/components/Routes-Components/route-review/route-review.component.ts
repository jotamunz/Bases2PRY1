import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// SERVICES
import { SchemeService } from '../../../services/scheme.service'; // test-service
import { RoutePreviewService } from '../../../services/Route-Services/route-preview.service';

// MODELS
import { Scheme } from '../../../models/Scheme'; // test-model
import { RoutePreview } from '../../../models/Routes-Models/RoutePreview';
import { Observable } from 'rxjs';
import { RouteDetailed } from 'src/app/models/Routes-Models/RouteDetailed';

@Component({
  selector: 'app-route-review',
  templateUrl: './route-review.component.html',
  styleUrls: ['./route-review.component.css'],
})
export class RouteReviewComponent implements OnInit {
  //variables
  public schemes: Scheme[];
  public routePreviews: RoutePreview[];
  public routes: RouteDetailed;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService,
    private routePreviewService: RoutePreviewService
  ) {}

  ngOnInit(): void {
    // Todo: Get all routePreviews
    this.routePreviewService
      .getAllRoutesPreview()
      .subscribe((routePreview: RoutePreview[]) => {
        this.routePreviews = routePreview;
        console.log(routePreview);
      });
    this.getSpesRoute('Dictadura');
  }

  /**
   * Removes a scheme
   * @param routeName to remove
   */
  public onDeleteClick(name: string) {
    this.routePreviewService.deleteRoute(name).subscribe(
      (res) => {
        this.flashMessagesService.show(name + 'deleted successfully', {
          cssClass: 'alert success-alert',
        });
      },
      (error) => {
        this.flashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }

  /**
   * Removes a scheme
   * @param routeName to patch (update)
   */

  public onToggle(name: string) {
    this.routePreviewService.toggleRoute(name).subscribe(
      (res) => {
        this.flashMessagesService.show('Route status toggled successfully', {
          cssClass: 'alert success-alert',
        });
      },
      (error) => {
        this.flashMessagesService.show(error.error.message, {
          cssClass: 'alert danger-alert',
        });
      }
    );
  }

  /**
   * get detailed route
   * @param routeName to patch (update)
   */

  public getSpesRoute(name: string) {
    return this.routePreviewService
      .getSpesRoute(name)
      .subscribe((route: RouteDetailed) => {
        this.routes = route;
        console.log(this.routes);
        console.log(this.routes.authors);
      });
  }
}
