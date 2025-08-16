import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError, tap } from "rxjs";
import { DialogApiService } from "../../services/dialog-api.service";
import * as dialogActions from "./dialog.actions";

export class DialogEffects {

    private actions$ = inject(Actions);
    private api = inject(DialogApiService);

    openEditProfileDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openEditProfileDialog),
            tap(() => this.api.showEditProfileDialog())

        ),
        { dispatch: false }
    );


    openCreateProfileDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openCreateProfileDialog),
            tap(() => this.api.showCreateProfileDialog())
        ),
        { dispatch: false }
    );


    openCongratulationsDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openCongratulationsDialog),
            tap(() => this.api.showCongratulationsDialog())
        ),
        { dispatch: false }
    );

    openAuthenticationErrorDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openAuthenticationErrorDialog),
            tap(() => this.api.showErrorDialog("username or password is incorrect."))
        ),
        { dispatch: false }
    );

    openMatchWonDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openMatchWonDialog),
            tap(() => this.api.showMatchWonDialog())
        ),
        { dispatch: false }
    );

    openMatchLostDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openMatchLostDialog),
            tap(() => this.api.showMatchLostDialog())
        ),
        { dispatch: false }
    );


    openMatchForfittedDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openMatchForfittedDialog),
            tap(() => this.api.showMatchForfittedDialog())
        ),
        { dispatch: false }
    );
}