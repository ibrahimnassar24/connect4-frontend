import { createReducer, INITIAL_REDUCERS, on } from '@ngrx/store';
import Profile from './profile.model';
import * as ProfileActions from './profile.actions';

const intialValue: Profile = {
    firstName: null,
    lastName: null,
    email: null,
    avatarUrl: null,
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
    )

    // on(
    //     ProfileActions.createProfileSuccess,
    //     (state, profile) => {
    //         return {
    //             ...state,
    //             ...profile
    //         };
    //     }
    // ),

    
);