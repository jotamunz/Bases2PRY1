import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { SchemeService } from '../../services/scheme.service';

import { User } from '../../models/User';
import { Scheme } from '../../models/Scheme';

@Component({
  selector: 'app-assign-scheme-to-user',
  templateUrl: './assign-scheme-to-user.component.html',
  styleUrls: ['./assign-scheme-to-user.component.css'],
})
export class AssignSchemeToUserComponent implements OnInit {
  public user: User = {
    username: '',
    name: '',
    password: '',
    isAdmin: false,
  };
  public schemeItems: any[];

  constructor(
    private userService: UserService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private schemeService: SchemeService
  ) {}

  ngOnInit(): void {
    // Get username
    this.activatedRoute.params.subscribe((params) => {
      const { username } = params;
      // Get user
      this.userService.getUserByUsername(username).subscribe((user: User) => {
        this.user = user;
        // Get schemes
        this.schemeService.getAllSchemes().subscribe((schemes: Scheme[]) => {
          // Map to items in form
          this.schemeItems = schemes.map((scheme) => {
            // Check if user has it
            if (this.checkIfInUserSchemes(scheme._id)) {
              return {
                checked: true,
                name: scheme.name,
              };
            }
            return {
              checked: false,
              name: scheme.name,
            };
          });
        });
      });
    });
  }

  /**
   * Checks if scheme exists in the user
   * @param schemeId The scheme id to search for
   */
  private checkIfInUserSchemes(schemeId: string): boolean {
    let isInUser: boolean = false;
    for (let scheme of this.user.accessibleSchemes) {
      if (scheme.schemeId === schemeId) {
        isInUser = true;
        break;
      }
    }
    return isInUser;
  }

  public onSubmit(): void {
    // TODO: Submit form
    console.log(this.schemeItems);
  }
}
