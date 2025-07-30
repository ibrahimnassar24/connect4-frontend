import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule, MatMiniFabButton } from '@angular/material/button';
import { MatIconModule} from "@angular/material/icon";
import { ImageCropperDialogComponent } from '../dialogs/image-cropper-dialog/image-cropper-dialog.component';
import { Store } from '@ngrx/store';
import { updateAvatar, updateCover } from '../../state/profile/profile.actions';
import { DialogApiService } from '../../services/dialog-api.service';

@Component({
  selector: 'app-choose-photo-button',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './choose-photo-button.component.html',
  styleUrl: './choose-photo-button.component.scss'
})
export class ChoosePhotoButtonComponent {
  @Input() imageType: 'cover' | 'avatar' = 'avatar';

  constructor(
    private store: Store,
    private dialogApi: DialogApiService
  ) { }

  onImageChange(event: any) {
    const dialogRef = this.dialogApi.showImageCropperDialog(event);

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log("result = ", result);
        if (this.imageType === 'avatar') {
          this.store.dispatch(updateAvatar({ avatar: result }));
        } else {
          this.store.dispatch(updateCover({ cover: result }));
        }
      })
  }

  
}
