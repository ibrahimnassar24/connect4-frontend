import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';
import { Store } from '@ngrx/store';
import { createMatch } from '../../state/match/match.actions';
import * as matchSelectors from "../../state/match/match.selectors";
import * as matchActions from "../../state/match/match.actions";
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { selectUserEmail } from '../../state/user/user.selectors';

@Component({
  selector: 'app-play',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BoardComponent
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {
matchId: Observable<string | null>;
firstPlayer: Observable<string | null>;
secondPlayer = new FormControl("");
  constructor(
    private store: Store
  ) {
    this.matchId = this.store.select( matchSelectors.selectId);
    this.firstPlayer = this.store.select( selectUserEmail);
  }

  onCreate() {
    
    let firstPlayerEmail: string | null = "";
    this.firstPlayer.subscribe( email => firstPlayerEmail = email)
    const secondPlayerEmail = this.secondPlayer.value ?? "";
    this.store.dispatch( matchActions.createMatch({
      firstPlayer: firstPlayerEmail,
      secondPlayer: secondPlayerEmail
    }))
  }
}
