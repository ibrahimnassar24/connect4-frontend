import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCropperDialogComponent } from '../components/dialogs/image-cropper-dialog/image-cropper-dialog.component';
import { ProfileEditComponent } from '../components/dialogs/profile-edit/profile-edit.component';
import { CongratulationsDialogComponent } from '../components/dialogs/congratulations-dialog/congratulations-dialog.component';
import { ErrorDialogComponent } from '../components/dialogs/error-dialog/error-dialog.component';
import { MessageDialogComponent } from '../components/dialogs/message-dialog/message-dialog.component';
import { Store } from '@ngrx/store';
import { navigateToHome } from '../state/status/status.actions';
import { matchFinished } from '../state/match/match.actions';

@Injectable({
  providedIn: 'root'
})
export class DialogApiService {


  constructor(
    private dialog: MatDialog,
    private store: Store
  ) { }

  showEditProfileDialog() {
    this.dialog.open(ProfileEditComponent, {
      data: {
        dialogType: "edit"
      }
    });
  }

  showCreateProfileDialog() {
    this.dialog.open(ProfileEditComponent,
      {
        data: { dialogType: "create" }
      }
    )
  }

  showImageCropperDialog(e: Event) {
    return this.dialog.open(ImageCropperDialogComponent,
      {
        width: "600px",
        data: { imageChangedEvent: e }
      }
    );
  }

  showCongratulationsDialog() {
    this.dialog.open(CongratulationsDialogComponent);
  }

  showMatchWonDialog() {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: "Congratulations!",
          content: "You have won the match.",
          action: (() => this.store.dispatch(matchFinished())).bind(this)
        }
      }
    );
  }

  showMatchLostDialog() {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: "Hard Luck!",
          content: "You have lost the match.",
          action: (() => this.store.dispatch(matchFinished())).bind(this)
        }
      }
    );
  }

  showMatchForfittedDialog() {
    this.dialog.open(MessageDialogComponent,
      {
        data: {
          title: "Lucky for you",
          content: "The other player has forfitted the match.",
          action: (() => this.store.dispatch(matchFinished())).bind(this)
        }
      }
    );
  }

  showErrorDialog(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { msg }
    })
  }

}