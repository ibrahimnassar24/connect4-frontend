import { Injectable, inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { map, catchError } from "rxjs";
import { DialogApiService } from "../../services/dialog-api.service";
import * as dialogActions from "./dialog.actions";

export class DialogEffects {

    private actions$ = inject(Actions);
    private api = inject(DialogApiService);

    openEditProfileDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openEditProfileDialog),
            map(() => this.api.showEditProfileDialog())

        ),
        { dispatch: false }
    );


    openCreateProfileDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openCreateProfileDialog),
            map(() => this.api.showCreateProfileDialog())
        ),
        { dispatch: false }
    );


    openCongratulationsDialog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(dialogActions.openCongratulationsDialog),
            map(() => this.api.showCongratulationsDialog())
        ),
        { dispatch: false }
    );

    openAuthenticationErrorDialog$ = createEffect( () => 
    this.actions$.pipe(
        ofType(dialogActions.openAuthenticationErrorDialog),
        map( () => this.api.showErrorDialog("username or password is incorrect."))
    ),
    { dispatch: false}
    );
}