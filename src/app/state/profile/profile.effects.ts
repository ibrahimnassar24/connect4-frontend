import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as ProfileActions from "./profile.actions";
import * as statusActions from "../status/status.actions";
import * as dialogActions from "../dialog/dialog.actions";
import { ProfileApiService } from "../../services/profile-api.service";
import { UploadService } from "../../services/upload.service";

@Injectable()
export class ProfileEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private profileApiService = inject(ProfileApiService);
    private uploadApi = inject(UploadService);

    loadProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.loadProfile),
            mergeMap(action => {
                return this.profileApiService.getProfile(action.email).pipe(
                    map(profile => {
                        if (profile) {
                            return ProfileActions.loadProfileSuccess(profile);
                        } else {
                            return dialogActions.openCreateProfileDialog();
                        }
                    }),
                    catchError(error => {
                        if (error.status === 404) {
                            return [dialogActions.openCreateProfileDialog()]
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
                this.profileApiService.createProfile(action.data).pipe(
                    switchMap((res) => {
                        return [
                            ProfileActions.createProfileSuccess({ profile: res }),
                            statusActions.navigateToHome()
                        ];
                    }),
                    catchError(error => [ProfileActions.profileError({ error: error.message })])
                )
            )
        )
    );

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateProfile),
            mergeMap(action =>
                this.profileApiService.updateProfile(action.data)
                    .pipe(
                        map(profile => ProfileActions.updateProfileSuccess({ profile })),
                        catchError(error => [ProfileActions.profileError({ error })])
                    )
            )
        )
    );

    updateAvatar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateAvatar),
            mergeMap(action => {
                return this.uploadApi.uploadAvatar(action.avatar)
                    .pipe(
                        map(res => ProfileActions.updateAvatarSuccess({ url: res.url })),
                        catchError(error => [ProfileActions.profileError({ error })])
                    )
            })
        )
    );

    updateCover$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProfileActions.updateCover),
            mergeMap(action => {
                return this.uploadApi.uploadCover(action.cover)
                    .pipe(
                        map(res => ProfileActions.updateCoverSuccess({ url: res.url })),
                        catchError(error => [ProfileActions.profileError({ error })])
                    )
            })
        )
    );


}