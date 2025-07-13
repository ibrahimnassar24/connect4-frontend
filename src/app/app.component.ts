import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppActions from "./state/app/app.actions";
import { NavbarComponent } from './components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'connect4-frontend';

  constructor(
    private store: Store
  ) {

  }
  
  ngOnInit() {
    this.store.dispatch(AppActions.appInitialization());
  }


}
