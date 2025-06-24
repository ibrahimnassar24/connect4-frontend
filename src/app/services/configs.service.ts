import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  baseUrl: string = 'http://localhost:5286/';

  constructor() { }

}
