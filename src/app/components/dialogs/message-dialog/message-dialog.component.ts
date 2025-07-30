import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageDialogData } from '../../../state/helpers/MessageDialogData';

@Component({
  selector: 'app-message-dialog',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss'
})
export class MessageDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) {}

  onClick() {
    this.data?.action();
    this.dialogRef.close();
  }

}
