import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as statusActions from "./status.actions";
import { Router } from "@angular/router";
import { UtilitiesService } from "../../services/utilities.service";
import { from, map, mergeMap, catchError, switchMap } from "rxjs";

@Injectable()
export class StatusEffects {
    private actions$ = inject(Actions);
    router = inject(Router);
    utilities = inject(UtilitiesService);

    navigateToHome$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToHome),
            mergeMap(() => {
                return from(this.router.navigate([""])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToRegister$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToRegister),
            mergeMap(() => {
                return from(this.router.navigate(["auth", "register"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(statusActions.navigateToLogin),
            mergeMap((action) => {
                return from(this.router.navigate(["auth", "login"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToProfileEdit$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToProfileEdit),
            mergeMap(() => {
                return from(this.router.navigate(["profile", "edit"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToProfileView$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToProfileView),
            mergeMap(() => {
                return from(this.router.navigate(["profile", "view"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToNotifications$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToNotifications),
            mergeMap(() => {
                return from(this.router.navigate(["notifications"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    navigateToPlay$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.navigateToPlay),
            mergeMap(() => {
                return from(this.router.navigate(["play"])).pipe(
                    map(() => statusActions.navigateSuccess()),
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    });


    goToSavedLocation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(statusActions.goToSavedLocation),
            map(() => this.utilities.goToLocation()),
            map( () => statusActions.goToSavedLocationSuccess()),
            catchError(error => [statusActions.navigateError({ error })])
        );

    },);

    navigateToSearchResults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusActions.navigateToSearchResults),
            mergeMap(() =>
                from(this.router.navigate(["searchresults"]))
                    .pipe(
                        map(() => statusActions.navigateSuccess()),
                        catchError(error => [statusActions.navigateError({ error: error })])
                    )
            )
        )
    );


    navigateToOthersProfileView$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusActions.navigateToOthersProfileView),
            map(action => this.router.navigate(["profile", "view", action.email])),
            catchError(error => [statusActions.navigateError({ error: error })])
        ),
        { dispatch: false }
    );

    saveCurrentLocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(statusActions.saveCurrentLocation),
            map(() => statusActions.saveCurrentLocationsuccess({ location: this.router.url })),
            catchError(error => [statusActions.navigateError({ error })])
        )
    );


}