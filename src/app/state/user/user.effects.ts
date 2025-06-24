import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApiService } from "../../services/auth-api.service";
import * as userActions from "./user.actions";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Action } from "@ngrx/store";

@Injectable()
export class UserEffects {
    private actions$: Actions = inject(Actions);
    private authApiService: AuthApiService = inject(AuthApiService);

    register$ = createEffect(() => {

        
        return this.actions$.pipe(
            ofType(userActions.register),
            mergeMap(action =>
                this.authApiService.register(action).pipe(
                    map(response => userActions.registerSuccess({ email: action.email })),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });



    logIn$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.logIn),
            mergeMap(action =>
                this.authApiService.login(action).pipe(
                    map(response => userActions.logInSuccess({ email: action.email })),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });



    logOut$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.logOut),
            mergeMap(() =>
                this.authApiService.logout().pipe(
                    map(() => userActions.logOutSuccess()),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });
}   