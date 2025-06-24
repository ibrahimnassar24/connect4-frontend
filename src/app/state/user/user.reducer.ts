import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import User from './user.model';

const initialValue: User = {
    email: null
};

export const userReducer = createReducer(
    initialValue,
    on(
        userActions.registerSuccess,
        (state, { email }) => {
            const temp = {
                ...state,
                email
            };
            return temp;
        }),

    on(
        userActions.logInSuccess,
        (state, { email }) => {
            const temp = {
                ...state,
                email
            };

            return temp;
        }),

    on(
        userActions.logOutSuccess,
        state => {
            const temp = {
                ...state,
                email: null
            };

            return temp;
        }),

    on(
        userActions.authError,
        (state, { error }) => {

            console.error('Authentication error:', error);
            return state; // No change to state on error
        })
);