import { Injectable } from '@angular/core';
import * as SignalR from "@microsoft/signalr";
import { ConfigsService } from './configs.service';
import { Store } from '@ngrx/store';
import * as notificationActions from "../state/notification/notification.actions";
import { selectEmail } from '../state/profile/profile.selectors';
import { Match } from '../state/match/match.model';
import * as matchActions from '../state/match/match.actions';
import Movement from '../state/helpers/movement';
import { from } from 'rxjs';
import { selectInvitationId } from '../state/match/match.selectors';

@Injectable({
  providedIn: 'root'
})
export class HubApiService {

  private baseUrl: string;
  private hub;
  constructor(
    private store: Store,
    private configs: ConfigsService
  ) {
    this.baseUrl = this.configs.baseUrl + "hub";
    this.hub = new SignalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .build();
  }

  start() {
    this.hub.on("notification", (data) => {
      const notification = JSON.parse(data);
      notification.payload = JSON.parse(notification.payload);
      this.store.dispatch(notificationActions.notificationReceived({ notification }))
    });

    this.hub.on("match", (data) => {
      const match: Match = JSON.parse(data);

      this.store.select(selectInvitationId)
        .subscribe(invitationId => {
          if (match.invitationId === invitationId)
            this.store.dispatch(matchActions.matchStarted({ match }));
        })
    });

    this.hub.on("cancel", (invitationId) => {
      this.store.select(selectInvitationId)
        .subscribe(id => {
          if (invitationId === id)
            this.store.dispatch(matchActions.reset());
        })
    })

    this.hub.on("movement", (data) => {
      const movement: Movement = JSON.parse(data);
      this.store.dispatch(matchActions.receiveMovement({ movement }));
    });

    this.hub.on("changeTurn", (turn) => {
      this.store.dispatch(matchActions.changeTurn({ turn }));
    });

    this.hub.on("gameWon", (winner => {
      this.store.dispatch(matchActions.matchWon())
    }))

    this.hub.on("gameOver", () => {
      this.store.dispatch(matchActions.matchLost());
    })
    return this.hub.start();
  }

  sendMovement(movement: Movement): Promise<void> {
    return this.hub.send("Movements", movement)
  }

}