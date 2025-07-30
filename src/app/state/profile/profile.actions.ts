import { createAction, props } from "@ngrx/store";
import Profile from "./profile.model";
import { ProfileFormData } from "../helpers/ProfileFormData";


// Define the action types for profile management
export const loadProfile = createAction(
    "[Profile] Load Profile",
    props<{ email: string }>()
);

export const loadProfileSuccess = createAction(
    "[Profile] Load Profile Success",
    props<Profile>()
);

export const createProfile = createAction(
    "[Profile] Create Profile",
props<{ data: ProfileFormData}>()
);

export const createProfileSuccess = createAction(
    "[Profile] Create Profile Success",
    props<{ profile: Profile}>()
);
export const updateProfile = createAction(
    "[Profile] Update Profile",
    props<{ data: ProfileFormData}>()
);

export const updateProfileSuccess = createAction(
    "[Profile] Update Profile Success",
    props<{ profile: Profile}>()
);


export const profileError = createAction(
    "[Profile] Profile Error",
    props<{ error: string }>()
);

export const clearProfile = createAction(
    "[Profile] Clear Profile"
);

export const updateAvatar = createAction(
    "[Profile] Update Avatar",
    props<{ avatar: Blob }>()
);

export const updateAvatarSuccess = createAction(
    "[Profile] Update Action Success",
    props<{ url: string}>()
);

export const updateCover = createAction(
    "[Profile] Update Cover",
    props<{ cover: Blob}>()
);

export const updateCoverSuccess = createAction(
    "[Profile] Update Cover Success",
    props<{ url: string}>()
);