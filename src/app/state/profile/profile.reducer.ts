import { createReducer, INITIAL_REDUCERS, on } from '@ngrx/store';
import Profile from './profile.model';
import * as ProfileActions from './profile.actions';

const intialValue: Profile = {
    firstName: null,
    lastName: null,
    email: null,
    avatarUrl: null,
    coverUrl: null,
    createdAt: null,
    updatedAt: null,
    bio: null
};

export const profileReducer = createReducer(
    intialValue,
    on(
        ProfileActions.loadProfileSuccess,
        (state, profile) => {
            return {
                ...state,
                ...profile
            };
        }
    ),

    on(
        ProfileActions.clearProfile,
        (state) => {
            return {
                ...intialValue
            };
        }
    ),

    on(
        ProfileActions.createProfileSuccess,
        (state, { profile }) => {
            return {
                ...state,
                ...profile
            };
        }
    ),

    on(
        ProfileActions.updateProfileSuccess,
        ( state, { profile}) => {
            return {
                ...state,
                ...profile
            };
        }
    ),

    on(
        ProfileActions.updateAvatarSuccess,
        (state, { url }) => {
            return {
                ...state,
                avatarUrl: url
            };
        }
    ),


    on(
        ProfileActions.updateCoverSuccess,
        (state, { url }) => {
            return {
                ...state,
                coverUrl: url
            };
        }
    )
);