import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user/user.actions';
import * as userSelectors from '../../state/user/user.selectors';
import * as profileSelectors from "../../state/profile/profile.selectors";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    MatButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  links: (string | undefined)[];
  email: Observable<string | null>;
  fullName: Observable<string | null>;
  constructor(
    private store: Store
  ) {
    this.links = routes
      .filter(route => route.path && route.path !== '**' && route.path !== '')
      .map(route => route.path);
  this.email = this.store.select(userSelectors.selectUserEmail);
  this.fullName = this.store.select(profileSelectors.selectFullName)
    }

  onLogout() {
    this.store.dispatch(userActions.logOut());
  }
}
