import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  baseUrl: string = 'http://192.168.1.2:5286/';
  apiUrl: string = this.baseUrl + 'api/';
  hubUrl = this.baseUrl + "hub/";
  matchUrl = this.apiUrl + 'Match/';
  uploadUrl = this.baseUrl + "api/upload/";

  constructor() { }

}
