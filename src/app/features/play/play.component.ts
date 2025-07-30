import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../../components/board/board.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Store } from '@ngrx/store';
import * as matchSelectors from "../../state/match/match.selectors";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-play',
  imports: [
    CommonModule,
    BoardComponent,
    LoadingComponent
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {
  matchId: Observable<string | null>;

  constructor(
    private store: Store
  ) {
    this.matchId = this.store.select(matchSelectors.selectId);
  }


}