import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import * as stateHelperActions from "./stateHelper.actions";

@Injectable()
export class StateHelperEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);

    logActions$ = createEffect(() => {
        return this.actions$.pipe(
            withLatestFrom(this.store),
            tap( ([action, state]) => {
                console.log(action.type)
                // console.log(state)
            })
        );
    }, { dispatch: false });


}