import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SearchBoxComponent } from '../../components/boxes/search-box/search-box.component';
import { Store } from '@ngrx/store';
import { selectSearchResults } from '../../state/search/search.selectores';
import { navigateToOthersProfileView } from '../../state/status/status.actions';
import { Observable } from 'rxjs';
import { UserSearchResult } from '../../state/helpers/UserSearchResult';
import { createInvitation } from '../../state/match/match.actions';

@Component({
  selector: 'app-search-results-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    SearchBoxComponent
  ],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss'
})
export class SearchResultsPageComponent {
  results: Observable<UserSearchResult[]>;

  constructor(
    private store: Store
  ) {
    this.results = this.store.select(selectSearchResults);
  }

  showProfile(email: string) {
    this.store.dispatch(navigateToOthersProfileView({ email }));
  }

  onInvite(email: string) {
    this.store.dispatch(createInvitation({ email}))

  }
}