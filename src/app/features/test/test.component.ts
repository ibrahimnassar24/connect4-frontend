import {
  Component,
  Renderer2,
  ViewChild,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProfileActions from '../../state/profile/profile.actions';
import { AuthApiService } from '../../services/auth-api.service';
import * as matchActions from "../../state/match/match.actions";
import * as matchSelectors from "../../state/match/match.selectors";
import Movement from '../../state/helpers/movement';
import { from, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HubApiService } from '../../services/hub-api.service';
import { selectNotifications } from '../../state/notification/notification.selectors';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProfileApiService } from '../../services/profile-api.service';

@Component({
  selector: 'app-test',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
constructor(
  private api: HubApiService
) {
}

}