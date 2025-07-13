import { Component, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as matchActions from "../../state/match/match.actions";
import * as matchSelectors from "../../state/match/match.selectors";
import Movement from '../../state/helpers/movement';
import { selectEmail } from '../../state/profile/profile.selectors';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  grid: Observable<(Movement | null)[][] | undefined>;
  player:Observable<string | null>;
  matchId: Observable<string | null>;
  winner: Observable<string | null>;
  
  constructor(
    private store: Store
  ) {
    this.grid = this.store.select(matchSelectors.selectGrid);
    this.player = this.store.select( selectEmail);
    this.matchId = this.store.select(matchSelectors.selectId);
    this.winner = this.store.select(matchSelectors.selectWinner);
  }

  onClick(c: number) {
    let player = "";
    this.player.subscribe( v => player = v!);
    let matchId = 0;
    this.matchId.subscribe(v => matchId = numberAttribute(v))
    const movement: Movement = {
      matchId,
      player,
      format: "",
      column: c,
    };
    this.store.dispatch(matchActions.sendMovement({movement}))
  }


}