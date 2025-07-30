import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    ImageCropperComponent
  ],
  templateUrl: './image-cropper-dialog.component.html',
  styleUrl: './image-cropper-dialog.component.scss'
})
export class ImageCropperDialogComponent {
  imageChangedEvent: Event;
  croppedImageUrl: string | null = null;
  croppedImageBlob: Blob | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageChangedEvent = data.imageChangedEvent;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageUrl = event.objectUrl!;
    this.croppedImageBlob = event.blob!;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCrop(): void {
    this.dialogRef.close(this.croppedImageBlob);
  }

  onLoadImageFailed() {
    console.error('Image load failed');
  }
}
