import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { navigateToLogin } from '../../../state/status/status.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-congratulations-dialog',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './congratulations-dialog.component.html',
  styleUrl: './congratulations-dialog.component.scss'
})
export class CongratulationsDialogComponent {

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<CongratulationsDialogComponent>
  ) { }

  onClick() {
    this.store.dispatch(navigateToLogin());
    this.dialogRef.close();
  }

}
