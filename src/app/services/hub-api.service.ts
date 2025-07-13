import { Injectable } from '@angular/core';
import * as SignalR from "@microsoft/signalr";
import { ConfigsService } from './configs.service';
import { Store } from '@ngrx/store';
import * as notificationActions from "../state/notification/notification.actions";
import { selectEmail } from '../state/profile/profile.selectors';
import { Match } from '../state/match/match.model';
import { changeTurn, matchFinished, matchStarted, receiveMovement } from '../state/match/match.actions';
import Movement from '../state/helpers/movement';
import { from } from 'rxjs';

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
      this.store.dispatch(notificationActions.notificationReceived({ notification }))
    });

    this.hub.on("match", (data) => {
      const match: Match = JSON.parse(data);
      this.store.dispatch(matchStarted({ match }));
    });

    this.hub.on("movement", (data) => {
      const movement: Movement = JSON.parse(data);
      this.store.dispatch(receiveMovement({ movement }));
    });

    this.hub.on("changeTurn", ( turn ) => {
      this.store.dispatch(changeTurn({turn}));
    });

    this.hub.on("matchFinished", ( winner => {
      this.store.dispatch(matchFinished({ winner }))
    }))
    return this.hub.start();
  }

  sendMovement(movement: Movement): Promise<void> {
    console.log("hello from send movement method")
    return this.hub.send("Movements", movement)
  }

}