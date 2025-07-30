import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { navigateToNotifications } from '../../state/status/status.actions';

@Component({
  selector: 'app-notifications-icon-button',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './notifications-icon-button.component.html',
  styleUrl: './notifications-icon-button.component.scss'
})
export class NotificationsIconButtonComponent {

  constructor(
    private store: Store
  ) {}

  onClick() {
  this.store.dispatch(navigateToNotifications())
}
}
