import { Injectable } from '@angular/core';
import { ConfigsService } from './configs.service';
import { HttpClient } from '@angular/common/http';
import SignUserForm from '../helpers/signUserForm';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  url: string;
  constructor(
    private configs: ConfigsService,
    private httpClient: HttpClient
  ) {
    this.url = this.configs.baseUrl;
  }

  register(user: SignUserForm) {
    return this.httpClient.post(
      this.url + 'register',
      user
    );

  }

  login(user: SignUserForm) {
    return this.httpClient.post(
      this.url + 'login?useCookies=true',
      user,
      {
        withCredentials: true
      }
    );

  }

  logout() {
    return this.httpClient.post(
      this.url + 'logout',
      {},
      {
        withCredentials: true
      }
    );

  }

  test() {
    this.httpClient.get(
      this.url + 'WeatherForecast',
      {
        withCredentials: true
      }

    ).subscribe(
      response => console.log('Test successful', response),
      error => console.error('Test failed', error)
    )
  }

}
