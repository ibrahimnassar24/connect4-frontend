import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from './state/user/user.actions';
import SignUserForm from './helpers/signUserForm';
import { AuthApiService } from './services/auth-api.service';
import * as statusActions from './state/status/status.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'connect4-frontend';

  constructor(
    private authApiService: AuthApiService,
    private store: Store
  ) {

  }

  register() {
    const temp: SignUserForm = {
      email: "user@test.com",
      password: "123@Bc",
    };

    this.store.dispatch(userActions.register(temp));
  }

  login() {
    const temp: SignUserForm = {
      email: "user@test.com",
      password: "123@Bc",
    };

    this.store.dispatch(userActions.logIn(temp));
  }

  logout() {
    this.store.dispatch(userActions.logOut());
  }

  test() {
    // this.authApiService.test();
    this.store.dispatch(statusActions.navigateTo({ path: "profile"}));
  }
}
