import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import Profile from './profile.model';

// Define the feature state for profile
export const selectProfileState = createFeatureSelector<Profile>('profile');

// Selector to get the profile ID


// Selector to get the first name of the profile
export const selectFirstName = createSelector(
    selectProfileState,
    (state: Profile) => state.firstName
);

// Selector to get the last name of the profile
export const selectLastName = createSelector(
    selectProfileState,
    (state: Profile) => state.lastName
);

// Selector to get the email of the profile
export const selectEmail = createSelector(
    selectProfileState,
    (state: Profile) => state.email
);

// Selector to get the avatar URL of the profile
export const selectAvatarUrl = createSelector(
    selectProfileState,
    (state: Profile) => state.avatarUrl
);

export const selectCoverUrl = createSelector(
    selectProfileState,
    ( State ) => State.coverUrl
);

// Selector to get the createdAt date of the profile
export const selectCreatedAt = createSelector(
    selectProfileState,
    (state: Profile) => state.createdAt
);

// Selector to get the updatedAt date of the profile
export const selectUpdatedAt = createSelector(
    selectProfileState,
    (state: Profile) => state.updatedAt
);

// Selector to get the bio of the profile
export const selectBio = createSelector(
    selectProfileState,
    (state: Profile) => state.bio
);

export const selectFullName = createSelector(
    selectProfileState,
    (state) => (state.firstName) ? state.firstName + " " + state.lastName : null
);