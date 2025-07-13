import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApiService } from "../../services/auth-api.service";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import * as userActions from "./user.actions";
import * as profileactions from "../profile/profile.actions";
import * as notificationActions from "../notification/notification.actions";
import * as statusActions from '../status/status.actions';

@Injectable()
export class UserEffects {
    private actions$: Actions = inject(Actions);
    private authApiService: AuthApiService = inject(AuthApiService);

    register$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.register),
            mergeMap(action =>
                this.authApiService.register(action).pipe(
                    switchMap(() => [
                        userActions.registerSuccess({ email: action.email }),
                        statusActions.navigateToProfileEdit()
                    ]),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });



    logIn$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.logIn),
            switchMap(action =>
                this.authApiService.login(action).pipe(
                    switchMap(response => [
                        userActions.logInSuccess({ email: action.email })
                    ]),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });



    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.logInSuccess),
            switchMap(({ email }) => [
                profileactions.loadProfile({ email }),
                notificationActions.listenForNotifications(),
                // statusActions.navigateToHome()
            ]),
        )

    );



    logOut$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.logOut),
            mergeMap(() =>
                this.authApiService.logout().pipe(
                    mergeMap(() => [
                        profileactions.clearProfile(),
                        statusActions.navigateToLogin(),
                        userActions.logOutSuccess()
                    ]),
                    catchError(error => [userActions.authError({ error: error.message })])
                )
            )
        )
    });
}   