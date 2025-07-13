import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as MatchActions from "./match.actions";
import { map, mergeMap, catchError, from, EMPTY, of } from "rxjs";
import { MatchApiService } from "../../services/match-api.service";

export class MatchEffects {

    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private api = inject(MatchApiService);


    createMatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.createMatch),
            mergeMap(action =>
                this.api.createMatch(action.firstPlayer, action.secondPlayer)
                    .pipe(
                        map((match) => {
                            return MatchActions.waitingFroResponse({ match });
                        }),
                        catchError(error => [MatchActions.matchError({ msg: error })])
                    )
            )
        )
    );


    acceptInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.acceptInvitation),
            mergeMap((action) =>
                this.api.acceptInvitation(action.id).pipe(
                    map(match => MatchActions.matchStarted({ match })),
                    catchError(e => [MatchActions.matchError({ msg: e })])
                )
            )
        )
    );


    declineInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.declineInvitation),
            mergeMap(action =>
                this.api.declineInvitation(action.id).pipe(
                    catchError(error => [MatchActions.matchError({ msg: error })])
                )
            )
        ),
        {
            dispatch: false
        }
    );

    sendMovement$ = createEffect( () => 
        this.actions$.pipe(
            ofType(MatchActions.sendMovement),
            map( action => this.api.sendMovement( action.movement)),
            catchError( error => [MatchActions.matchError({ msg: error})])
        ),
{ dispatch: false}
);

    receiveMovement$ = createEffect( () =>
this.actions$.pipe(
    ofType(MatchActions.receiveMovement),
    map( action => MatchActions.addMovement(action.movement)),
    catchError( error => [ MatchActions.matchError({ msg: error})])
)
    );
}