import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public username: string;
  public password: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // @param User information
  // @returns Action event
  // On submit sends the information on the Login form
  public onSubmit(): void {
    this.user = {
      username: this.username,
      password: this.password,
    };

    // TODO: Incluir auth service aqui
    console.log(this.user.username);
    console.log(this.user.password);
  }
}
