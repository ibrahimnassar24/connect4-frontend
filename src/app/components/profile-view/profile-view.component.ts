import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogApiService } from '../../services/dialog-api.service';
import { ChoosePhotoButtonComponent } from '../choose-photo-button/choose-photo-button.component';
import { Store } from '@ngrx/store';
import * as profileActions from "../../state/profile/profile.actions";
import * as profileSelectors from "../../state/profile/profile.selectors";
import { observable, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-view',
  imports: [
    CommonModule,
    ChoosePhotoButtonComponent,
    MatButtonModule
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  coverUrl: Observable<string | null>;
  avatarUrl: Observable<string | null>;
  fullName: Observable<string | null>;
  bio: Observable<string | null>;

  constructor(
    private store: Store,
    private dialog: DialogApiService
  ) {
    this.fullName = this.store.select(profileSelectors.selectFullName);
    this.bio = this.store.select(profileSelectors.selectBio);
    this.avatarUrl = this.store.select(profileSelectors.selectAvatarUrl);
    this.coverUrl = this.store.select(profileSelectors.selectCoverUrl);
  }

  onEdit() {
    this.dialog.showEditProfileDialog();
  }
}