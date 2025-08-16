import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as MatchActions from "./match.actions";
import * as statusActions from "../status/status.actions";
import * as dialogActions from "../dialog/dialog.actions";
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



    createInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.createInvitation),
            mergeMap(action =>
                this.api.createInvitation(action.email).pipe(
                    switchMap(res => [
                        MatchActions.invitationSubmitted({ invitationId: res.invitationId }),
                        statusActions.navigateToPlay(),
                        MatchActions.listenForInvitationNotifications(),
                        MatchActions.startInvitationResponseTimer()
                    ])
                )
            )
        )
    );

    startInvitationResponseTimer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.startInvitationResponseTimer),
            withLatestFrom(this.store$.select(selectInvitationId)),
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

    invitationDeclined$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.invitationDeclined),
            switchMap(() => [
                MatchActions.stopListeningForInvitationNotifications(),
                MatchActions.reset(),
                statusActions.navigateToHome()
            ])
        )
    );

    withdrawInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.withdrawInvitation),
            mergeMap(action =>
                this.api.withdrawInvitation(action.invitationId)
                    .pipe(
                        mergeMap(() => [
                            MatchActions.stopListeningForInvitationNotifications(),
                            statusActions.navigateToHome()
                        ])
                    )
            )

        )
    );


    acceptInvitation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.acceptInvitation),
            mergeMap((action) =>
                this.api.acceptInvitation(action.id).pipe(
                    map(({ matchId }) => MatchActions.joinMatch({ matchId })),
                    catchError(e => [MatchActions.matchError({ msg: e })])
                )
            )
        )
    );


    joinMatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.joinMatch),
            switchMap(({ matchId }) => {
                this.api.joinMatch(matchId);
                return [
                    MatchActions.listenForMatchNotifications(),
                    MatchActions.stopListeningForInvitationNotifications(),
                    MatchActions.stopInvitationResponseTimer(),
                    statusActions.navigateToPlay()

                ];
            })
        )
    );



    listenForMatchNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.listenForMatchNotifications),
            tap(() => this.api.listenForNotifications())
        ),
        { dispatch: false }
    );


    stopListeningForMatchNotifications$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.stopListeningForMatchNotification),
            tap(() => this.api.stopListeningForNotification())
        ),
        { dispatch: false }
    );

    matchWon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchWon),
            mergeMap(() => [
                MatchActions.stopListeningForMatchNotification(),
                dialogActions.openMatchWonDialog()
            ])
        ),
    );

    matchForfitted$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchForfitted),
            switchMap(() => [
                MatchActions.stopListeningForMatchNotification(),
                dialogActions.openMatchForfittedDialog()
            ])
        )
    );


    matchLost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchLost),
            mergeMap(() => [
                MatchActions.stopListeningForMatchNotification(),
                dialogActions.openMatchLostDialog()
            ])

        ),
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


    listenForInvitationNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.listenForInvitationNotifications),
            tap(() => this.api.listenForInvitationNotification())
        ),
        { dispatch: false }
    );

    stopListeningForInvitationNotification$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.stopListeningForInvitationNotifications),
            tap((() => this.api.stopListenForInvitationNotification())
            )
        ),
        { dispatch: false }
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
            tap(action => this.api.sendMovement(action.movement)),
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

    matchError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchError),
            tap(action => console.log(action.msg))
        ),
        { dispatch: false }
    );


    matchWarning$ = createEffect(() =>
        this.actions$.pipe(
            ofType(MatchActions.matchWarning),
            tap(action => console.log(action.msg))
        ),
        { dispatch: false }
    );
}