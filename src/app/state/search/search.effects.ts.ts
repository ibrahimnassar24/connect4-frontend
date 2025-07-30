import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as searchActions from "./search.actions";
import { ProfileApiService } from "../../services/profile-api.service";
import { catchError, map, mergeMap } from "rxjs";


@Injectable()
export class SearchEffects {
    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private api = inject(ProfileApiService);

    getSearchResults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchActions.getSearchResults),
            mergeMap(action =>
                this.api.search(action.query)
                    .pipe(
                        map(results => searchActions.receiveSearchResults({ results })),
                        catchError(error => [searchActions.searchError({ error: error.msg })])
                    )
            )
        ));
}