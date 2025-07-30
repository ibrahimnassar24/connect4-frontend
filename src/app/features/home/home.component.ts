import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navigateToSearchResults } from '../../state/status/status.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private store: Store
  ) {
  }
  onClick() {
this.store.dispatch(navigateToSearchResults())    
  }
}
