import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApiService } from "../../services/auth-api.service";
import { catchError, map, switchMap, mergeMap, withLatestFrom } from "rxjs/operators";
import * as userActions from "./user.actions";
import * as profileactions from "../profile/profile.actions";
import * as notificationActions from "../notification/notification.actions";
import * as statusActions from '../status/status.actions';
import { openAuthenticationErrorDialog, openCongratulationsDialog, openCreateProfileDialog } from "../dialog/dialog.actions";
import { selectCurrentLocation } from "../status/status.selectors";

@Injectable()
export class UserEffects {
    private actions$: Actions = inject(Actions);
    private authApiService: AuthApiService = inject(AuthApiService);
    private store = inject(Store);

    register$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.register),
            mergeMap(action =>
                this.authApiService.register(action).pipe(
                    switchMap(() => [
                        userActions.registerSuccess({ email: action.email }),
                        openCongratulationsDialog()
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
                    catchError(error => {
                        if( error.status === 401) {
                            return [openAuthenticationErrorDialog()];
                        } else {
                            return [userActions.authError({ error: error.message })]
                        }
                    })
                )
            )
        )
    });



    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.logInSuccess),
            withLatestFrom(this.store.select(selectCurrentLocation)),
            switchMap(([{ email }, location]) => [
                statusActions.login(),
                profileactions.loadProfile({ email }),
                notificationActions.listenForNotifications(),
                statusActions.goToSavedLocation()
            ]),
        )

    );



    logOut$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(userActions.logOut),
            mergeMap(() =>
                this.authApiService.logout().pipe(
                    mergeMap(() => [
                        statusActions.logOut(),
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