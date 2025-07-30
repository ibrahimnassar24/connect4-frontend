import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { getSearchResults } from '../../../state/search/search.actions';
import { navigateToSearchResults } from '../../../state/status/status.actions';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileApiService } from '../../../services/profile-api.service';

@Component({
  selector: 'app-search-box',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {


  constructor(
    private store: Store
  ) { }


  onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const q = input.value;

    if (q.trim() === "")
      return;

    this.store.dispatch(getSearchResults({ query: q }));
  }


}