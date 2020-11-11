import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() submitUser: EventEmitter<any> = new EventEmitter();

  users: User[];
  username: string;
  password: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // @param User information
  // @returns Action event
  // On submit sends the information on the Login form

  onSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    //dentro de ese metodo iria el authService;
    console.log(user.username);
    console.log(user.password);
  }
}
