import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { from, mergeMap, catchError } from "rxjs";
import { HubApiService } from "../../services/hub-api.service";;
import * as notificationActions from "./notification.actions";

export class NotificationEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private hubApi = inject(HubApiService);

        listenForNotifications$ = createEffect(
            () => this.actions$.pipe(
                ofType(notificationActions.listenForNotifications),
                mergeMap(() =>
                    from(this.hubApi.start()).pipe(
                        catchError(error => [error])
                    )
    
                )
            ), {
            dispatch: false
        }
        );
}