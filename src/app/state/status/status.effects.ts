import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as statusActions from "./status.actions";
import { Router } from "@angular/router";
import { from, map, mergeMap, catchError } from "rxjs";

@Injectable()
export class StatusEffects {
    private actions$ = inject(Actions);
    router = inject(Router);

    navigateTo$ = createEffect(() => {
        
        return this.actions$.pipe(
            ofType(statusActions.navigateTo),
            mergeMap(action => {
                
                return from(this.router.navigate([action.path])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });
}