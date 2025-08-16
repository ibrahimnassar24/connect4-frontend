import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { ConfigsService } from './configs.service';
import { Match } from '../state/match/match.model';
import Movement from '../state/helpers/movement';
import { HubApiService } from './hub-api.service';
import { invitationSubmitted } from '../state/match/match.actions';

@Injectable({
  providedIn: 'root'
})
export class MatchApiService {
  url: string;

  constructor(
    private config: ConfigsService,
    private http: HttpClient,
    private hub: HubApiService
  ) {
    this.url = this.config.matchUrl;
  }

  createMatch(firstPlayerEmail: string, secondPlayerEmail: string) {
    const matchRequest = {
      firstPlayer: firstPlayerEmail,
      secondPlayer: secondPlayerEmail
    };
    const res = this.http.post<Match>(
      this.url,
      matchRequest,
      { withCredentials: true }
    );
    return res;
  }

  createInvitation(email: string) {
    const url = this.url + "invite";
    return this.http.post<{ invitationId: string }>(
      url,
      { email: email },
      { withCredentials: true }
    );
  }

  acceptInvitation(id: string) {
    const url = this.url + 'accept/' + id;
    return this.http.put<{ matchId: string }>(
      url,
      {},
      { withCredentials: true }
    );
  }

  declineInvitation(id: string) {
    const url = this.url + 'decline/' + id;
    return this.http.delete(
      url,
      { withCredentials: true }
    );
  }

  withdrawInvitation(id: string) {
    const url = this.url + "withdraw/" + id;
    return this.http.delete(
      url,
      { withCredentials: true }
    );
  }

  joinMatch(matchId: string) {
    this.hub.joinMatch(matchId);
  }

  sendMovement(movement: Movement) {
    return this.hub.sendMovement(movement);
  }

  listenForNotifications() {
    this.hub.listenForMatchNotifications();
  }

  stopListeningForNotification() {
    this.hub.stopListeningForMatchNotifications();
  }

  listenForInvitationNotification() {
    this.hub.listenForInvitationNotifications();
  }

  stopListenForInvitationNotification() {
    this.hub.stopListeningForInvitationNotification();
  }


}