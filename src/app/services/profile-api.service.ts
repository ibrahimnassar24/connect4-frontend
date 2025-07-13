import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from './configs.service';
import Profile from '../state/profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(
    private http: HttpClient,
    private configsService: ConfigsService
  ) { }

  getProfile(email: string) {
    const url = `${this.configsService.apiUrl}profile/${email}`;
    return this.http.get<Profile | null>(url);
  }

  createProfile(profile: Profile) {
    const url = `${this.configsService.apiUrl}profile`;
    return this.http.post<Profile>(url, profile);
  }

  test() {
    const url = this.configsService.apiUrl + 'notification' + '/test';
    return this.http.get(url, { withCredentials: true});
  }
}