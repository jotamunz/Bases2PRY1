import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser() {
    return [
      {
        id: '5',
        username: 'Alejandro',
        password: '1234',
      },
    ];
  }
}
