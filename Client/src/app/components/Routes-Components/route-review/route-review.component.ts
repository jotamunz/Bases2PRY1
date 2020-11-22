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
import { stringify } from 'querystring';

@Component({
  selector: 'app-route-review',
  templateUrl: './route-review.component.html',
  styleUrls: ['./route-review.component.css'],
})
export class RouteReviewComponent implements OnInit {
  //variables
  public schemes: Scheme[];
  public routesDetailed: RouteDetailed[];
  public routes: RouteDetailed;
  // target variables
  public currentName: string = 'Nothing';
  public currentRequiredApprovals: string = 'Nothing';
  public currentRequiredRejections: string = 'Nothing';

  constructor(
    private flashMessagesService: FlashMessagesService,
    private schemeService: SchemeService,
    private routePreviewService: RoutePreviewService
  ) {}

  ngOnInit(): void {
    // Todo: Get all routePreviews
    this.routePreviewService
      .getAllRoutesPreview()
      .subscribe((routeDetailed: RouteDetailed[]) => {
        this.routesDetailed = routeDetailed;
        console.log(this.routesDetailed);
      });
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
        this.clearDeleted(name);
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

  public updateView(routes: RouteDetailed) {
    this.currentName = routes.name;
    this.currentRequiredApprovals =
      'Approvals Amount: ' + routes.requiredApprovals.toString();
    this.currentRequiredRejections =
      'Rejections Amount: ' + routes.requiredRejections.toString();
  }

  public clearDeleted(route : String){
    let temp = []
    this.routesDetailed.forEach(element => {
      if (element.name != route){
        temp.push(element)
      }
    });
    this.routesDetailed = temp

  }
}
