import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as MatchActions from "./match.actions";
import * as statusActions from "../status/status.actions";
import { map, mergeMap, catchError, from, EMPTY, of, tap, withLatestFrom, switchMap } from "rxjs";
import { MatchApiService } from "../../services/match-api.service";
import { DialogApiService } from "../../services/dialog-api.service";
import { UtilitiesService } from "../../services/utilities.service";
import { selectInvitationId } from "./match.selectors";

export class MatchEffects {

    private actions$ = inject(Actions);
    private store$ = inject(Store);
    private api = inject(MatchApiService);
    private dialogApi = inject(DialogApiService);
    private utls = inject(UtilitiesService);
    private store = inject(Store);


    createInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.createInvitation),
            mergeMap(action =>
                this.api.createInvitation(action.email).pipe(
                    switchMap(res => [
                        MatchActions.invitationSubmitted({ invitationId: res.invitationId }),
                        MatchActions.startInvitationResponseTimer()
                    ])
                )
            )
        )
    );

    startInvitationResponseTimer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.startInvitationResponseTimer),
            withLatestFrom(this.store.select(selectInvitationId)),
            tap(([action, invitationId]) => this.utls.registerTimer(invitationId!))
        ),
        { dispatch: false }
    );

    stopInvitationResponseTime$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.stopInvitationResponseTimer),
            tap(() => this.utls.clearTimer()),
        ),
        { dispatch: false }
    );

    withdrawInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.withdrawInvitation),
            tap(action => {
                console.log(action.invitationId)
                this.api.withdrawInvitation(action.invitationId)
            })
        ),
        { dispatch: false}
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


    matchStarted$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchStarted),
            map(() => statusActions.navigateToPlay())
        )
    );


    matchWon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchWon),
            tap(() => this.dialogApi.showMatchWonDialog())
        ),
        { dispatch: false }
    );


    matchLost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchLost),
            tap(() => MatchActions.matchFinished())
        ),
        { dispatch: false }
    );


    matchFinished$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchFinished),
            mergeMap(() => [
                MatchActions.reset(),
                statusActions.navigateToHome()
            ])
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

    sendMovement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.sendMovement),
            map(action => this.api.sendMovement(action.movement)),
            catchError(error => [MatchActions.matchError({ msg: error })])
        ),
        { dispatch: false }
    );

    receiveMovement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.receiveMovement),
            map(action => MatchActions.addMovement(action.movement)),
            catchError(error => [MatchActions.matchError({ msg: error })])
        )
    );
}