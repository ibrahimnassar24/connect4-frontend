import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as matchActions from "../../state/match/match.actions";
import { Notification } from '../../state/notification/notification.model';

@Component({
  selector: 'app-notification',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() data!: Notification;
  matchId: string = '';

  constructor(
    private store: Store
  ) {
  }

  ngOnInit() {
    this.matchId = this.data.Link;
  }

  onAccept() {
    const id = this.matchId;
    this.store.dispatch(matchActions.acceptInvitation({ id }))
  }

  onDecline() {
    const id = this.matchId;
    this.store.dispatch(matchActions.declineInvitation({ id }))
  }
}
