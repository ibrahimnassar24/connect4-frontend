import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as profileSelectors from "../../../state/profile/profile.selectors";
import { navigateToProfileView } from '../../../state/status/status.actions';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { logOut } from '../../../state/user/user.actions';

@Component({
  selector: 'app-user-box',
  imports: [
    CommonModule
  ],
  templateUrl: './user-box.component.html',
  styleUrl: './user-box.component.scss'
})
export class UserBoxComponent {

  avatarUrl: Observable<string | null>;
  fullName: Observable<string | null>;

  constructor(
    private store: Store
  ) {
    this.fullName = this.store.select(profileSelectors.selectFullName);
    this.avatarUrl = this.store.select(profileSelectors.selectAvatarUrl);
  }

  onClick() {
    this.store.dispatch(navigateToProfileView());
  }

  onLogout() {
    this.store.dispatch(logOut());
  }

}
