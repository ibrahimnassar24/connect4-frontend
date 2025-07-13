import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as ProfileActions from "./profile.actions";
import * as statusActions from "../status/status.actions";
import { ProfileApiService } from "../../services/profile-api.service";

@Injectable()
export class ProfileEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private profileApiService = inject(ProfileApiService);

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.loadProfile),
            mergeMap(action => {
                return this.profileApiService.getProfile(action.email).pipe(
                    map(profile => {
                        if (profile) {
                            return ProfileActions.loadProfileSuccess(profile);
                        } else {
                            return ProfileActions.profileError({ error: "Profile not found" });
                        }
                    }),
                    catchError(error => {
                        if (error.status === 404) {
                            return [statusActions.navigateToProfileEdit()]
                        } else {
                            return [ProfileActions.profileError({ error: error.message })]
                        }
                    })
                )
            }

            )
        )
    );

    createProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.createProfile),
            mergeMap(action =>
                this.profileApiService.createProfile(action).pipe(
                    switchMap((res) => {
                        return [
                            ProfileActions.createProfileSuccess(),
                            ProfileActions.loadProfile({email: action.email!}),
                            statusActions.navigateToHome()
                        ];
                    }),
                    catchError(error => [ProfileActions.profileError({ error: error.message })])
                )
            )
        )
    );
};