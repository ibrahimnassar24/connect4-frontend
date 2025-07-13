import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';;
import { ConfigsService } from './configs.service';
import { Match } from '../state/match/match.model';
import Movement from '../state/helpers/movement';
import { HubApiService } from './hub-api.service';

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

  acceptInvitation(id: string) {
    const url = this.url + 'accept/' + id;
    return this.http.get<Match>(
      url,
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

  sendMovement(movement: Movement) {
return this.hub.sendMovement(movement);
  }


}