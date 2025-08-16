import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  // baseUrl: string = 'http://192.168.1.9:5286/';
   baseUrl: string = 'https://localhost:44343/';

  apiUrl: string = this.baseUrl + 'api/';
  hubUrl = this.baseUrl + "hub/";
  matchUrl = this.apiUrl + 'Match/';
  uploadUrl = this.baseUrl + "api/upload/";

  constructor() { }

}
