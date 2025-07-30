import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from './configs.service';
import Profile from '../state/profile/profile.model';
import { UserSearchResult } from '../state/helpers/UserSearchResult';
import { ProfileFormData } from '../state/helpers/ProfileFormData';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  baseUrl: string;
  constructor(
    private http: HttpClient,
    private configsService: ConfigsService
  ) {
    this.baseUrl = this.configsService.apiUrl + "profile/";
  }

  getProfile(email: string) {
    const url = this.baseUrl + email;
    return this.http.get<Profile | null>(url);
  }

  createProfile(profile: ProfileFormData) {
    const url = this.baseUrl;
    return this.http.post<Profile>(
      url,
      profile,
      { withCredentials: true }
    );
  }

  updateProfile(data: ProfileFormData) {
    return this.http.patch<Profile>(
      this.baseUrl,
      data,
      { withCredentials: true }
    );
  }

  search(query: string) {
    const url = this.baseUrl + "search";
    return this.http.get<UserSearchResult[]>(
      url,
      {
        params: {
          query
        }
      }
    );
  }
}