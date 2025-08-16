import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as selectors from "../../state/profile/profile.selectors";
import { Observable } from 'rxjs';
import { logOut } from '../../state/user/user.actions';
import { navigateToProfileView } from '../../state/status/status.actions';

@Component({
  selector: 'app-user-button',
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './user-button.component.html',
  styleUrl: './user-button.component.scss'
})
export class UserButtonComponent {
  private store$ = inject(Store);
  email$: Observable<string | null>;
  fullName: Observable<string | null>;
  avatarUrl: Observable<string | null>;

  constructor() {
    this.email$ = this.store$.select(selectors.selectEmail);
    this.fullName = this.store$.select(selectors.selectFullName);
    this.avatarUrl = this.store$.select(selectors.selectAvatarUrl);
  }

  onLogout() {
    this.store$.dispatch(logOut());
  }

  onViewProfile() {
    this.store$.dispatch(navigateToProfileView())
  }
}
