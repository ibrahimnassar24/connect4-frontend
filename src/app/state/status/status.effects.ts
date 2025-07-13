import { inject, Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as statusActions from "./status.actions";
import { Router } from "@angular/router";
import { from, map, mergeMap, catchError, switchMap } from "rxjs";

@Injectable()
export class StatusEffects {
    private actions$ = inject(Actions);
    router = inject(Router);

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


    redirect$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(statusActions.redirect),
            mergeMap((action) => {
                return from(this.router.navigate(action.path)).pipe(
                    catchError(error => [statusActions.navigateError({ error })])
                );
            })
        );
    },
        { dispatch: false });


}