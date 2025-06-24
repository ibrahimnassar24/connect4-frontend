import { createAction, props } from "@ngrx/store";
import Profile from "./profile.model";


// Define the action types for profile management
export const loadProfile = createAction(
    "[Profile] Load Profile",
    props<{ userId: string }>()
);

export const loadProfileSuccess = createAction(
    "[Profile] Load Profile Success"
);

export const updateProfile = createAction(
    "[Profile] Update Profile",
    props<Profile>()
);

export const updateProfileSuccess = createAction(
    "[Profile] Update Profile Success",
    props<{ profile: Profile }>()
);  

export const profileError = createAction(
    "[Profile] Profile Error",
    props<{ error: string }>()
);