import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, from, map, mergeMap, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import * as appActions from "./app.actions";
import * as statusActions from "../status/status.actions";
import * as userActions from "../user/user.actions";
import { AuthApiService } from "../../services/auth-api.service";
import { HubApiService } from "../../services/hub-api.service";

@Injectable()
export class AppEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private authApi = inject(AuthApiService);
    private hubApi = inject(HubApiService);
    private router = inject(Router);

    logActions$ = createEffect(() => {
        return this.actions$.pipe(
            withLatestFrom(this.store),
            tap(([action, state]) => {
                console.log(action.type)
                // console.log(state.status.currentLocation)
            })
        );
    }, { dispatch: false });


    appInitialization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.appInitialization),
            mergeMap(() => [
                appActions.checkForLogin()
            ])
        )
    );



    checkForLogin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(appActions.checkForLogin),
            mergeMap(() =>
                this.authApi.checkLogin().pipe(
                    switchMap(({ email }) => [
                        statusActions.saveCurrentLocation(),
                        userActions.logInSuccess({ email }),
                    ]),
                    catchError(() => {

                        return [
                            statusActions.saveCurrentLocation(),
                            statusActions.navigateToLogin()
                        ]
                    })
                )
            )
        )
    );


}