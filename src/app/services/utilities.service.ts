import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentLocation } from '../state/status/status.selectors';
import { withdrawInvitation } from '../state/match/match.actions';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  timerId: any = null;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  getCurrentLocation() {
    return this.router.url;
  }

  goToLocation() {
    let location = "";
    this.store.select(selectCurrentLocation)
      .subscribe(value => {
        location = value;
      });
    this.router.navigate([location]);

  }

  registerTimer(invitationId: string) {
    const action = () => this.store.dispatch(withdrawInvitation({ invitationId}))
    console.log(invitationId)
    this.timerId = setTimeout(action, 3000);
  }

  clearTimer() {
    clearTimeout(this.timerId);
  }
}
