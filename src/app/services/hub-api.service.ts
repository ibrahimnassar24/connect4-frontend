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
import { selectInvitationId, selectMatchId } from '../state/match/match.selectors';
import { Notification } from '../state/notification/notification.model';

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

    return this.hub.start();
  }


  listenForInvitationNotifications() {
    this.hub.on("invitation", (invitationId, data) => {
      let currentInvitationId = "";
      this.store.select(selectInvitationId)
        .subscribe(id => currentInvitationId = id!);

      if (currentInvitationId != invitationId) return;

      const notification: Notification = JSON.parse(data);
      switch (notification.type) {
        case "invitationAccepted": {
          const match: { matchId: string } = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.joinMatch({ matchId: match.matchId }));
          break;
        }
        case "invitationDeclined": {
          this.store.dispatch(matchActions.invitationDeclined());
        }
      }
    })
  }

  stopListeningForInvitationNotification() {
    this.hub.off("invitation");
  }

  listenForMatchNotifications() {
    this.hub.on("match", (matchId, data) => {
      let currentMatchId = "";
      this.store.select(selectMatchId)
        .subscribe(id => currentMatchId = id!);

      if (matchId != currentMatchId) return;
      const notification: Notification = JSON.parse(data);

      switch (notification.type) {
        case "startMatch": {
          const match: Match = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.matchStarted({ match }))
          break;
        }
        case "addMovement": {
          const payload: Movement = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.receiveMovement({ movement: payload }));
          break;
        }
        case "switchTurn": {
          const payload = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.changeTurn({ turn: payload.turn }));
          break;
        }
        case "matchWon": {
          this.store.dispatch(matchActions.matchWon());
          break;
        }
        case "matchForfitted": {
          this.store.dispatch(matchActions.matchForfitted());
          break;
        }
        case "matchLost": {
          this.store.dispatch(matchActions.matchLost());
          break;
        }
        case "matchError": {
          const payload: { msg: string } = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.matchError({ msg: payload.msg }));
          break;
        }
        case "matchWarning": {
          const payload: { msg: string } = JSON.parse(notification.payload);
          this.store.dispatch(matchActions.matchWarning({ msg: payload.msg }));
        }

      }
    })
  }

  stopListeningForMatchNotifications() {
    this.hub.off("match");
  }

  joinMatch(matchId: string) {
    this.hub.send("JoinMatch", matchId);
  }

  sendMovement(movement: Movement): Promise<void> {
    return this.hub.send("Movements", movement)
  }

}