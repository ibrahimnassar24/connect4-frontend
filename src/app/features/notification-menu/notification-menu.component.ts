import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectNotifications } from '../../state/notification/notification.selectors';
import { Observable } from 'rxjs';
import { Notification } from '../../state/notification/notification.model';
import { NotificationComponent } from '../../components/notification/notification.component';
import { acceptInvitation } from '../../state/match/match.actions';


@Component({
  selector: 'app-notification-menu',
  imports: [
    CommonModule,
    NotificationComponent
  ],
  templateUrl: './notification-menu.component.html',
  styleUrl: './notification-menu.component.scss'
})
export class NotificationMenuComponent {
  notifications: Observable<Notification[]>;

constructor(
  private store: Store
) {
  this.notifications = this.store.select(selectNotifications);
}



}