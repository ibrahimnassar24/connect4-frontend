import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../../state/status/status.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication-box',
  imports: [
    CommonModule
  ],
  templateUrl: './authentication-box.component.html',
  styleUrl: './authentication-box.component.scss'
})
export class AuthenticationBoxComponent {

  isLoggedIn: Observable<boolean>

  constructor(
    private store: Store
  ) {
    this.isLoggedIn = this.store.select(selectIsLoggedIn);
  }
}
