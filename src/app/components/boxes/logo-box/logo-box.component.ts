import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navigateToHome } from '../../../state/status/status.actions';

@Component({
  selector: 'app-logo-box',
  imports: [],
  templateUrl: './logo-box.component.html',
  styleUrl: './logo-box.component.scss'
})
export class LogoBoxComponent {

  constructor(
    private store: Store
  ) {

  }

  onClick() {
    this.store.dispatch(navigateToHome());
  }
}
