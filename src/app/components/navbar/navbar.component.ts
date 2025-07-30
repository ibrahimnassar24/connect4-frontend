import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { MatButton } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user/user.actions';
import * as userSelectors from '../../state/user/user.selectors';
import * as profileSelectors from "../../state/profile/profile.selectors";
import { Observable } from 'rxjs';
import { changeMode } from '../../state/status/status.actions';
import { selectMode } from '../../state/status/status.selectors';
import { SearchBoxComponent } from '../boxes/search-box/search-box.component';
import { LogoBoxComponent } from '../boxes/logo-box/logo-box.component';
import { UserBoxComponent } from '../boxes/user-box/user-box.component';
import { ChangeModeButtonComponent } from '../change-mode-button/change-mode-button.component';
import { NotificationsIconButtonComponent } from '../notifications-icon-button/notifications-icon-button.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    LogoBoxComponent,
    UserBoxComponent,
    ChangeModeButtonComponent,
    NotificationsIconButtonComponent,
    MatButton,
    MatButtonToggleModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  email: Observable<string | null>;
  fullName: Observable<string | null>;
  darkMode: Observable<boolean>;
  
  constructor(
    private store: Store
  ) {
    this.darkMode = this.store.select(selectMode);
  this.email = this.store.select(userSelectors.selectUserEmail);
  this.fullName = this.store.select(profileSelectors.selectFullName)
    }

  onLogout() {
    this.store.dispatch(userActions.logOut());
  }

  
}
