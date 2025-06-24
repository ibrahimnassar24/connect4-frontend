import { createReducer, on } from '@ngrx/store';
import { Status } from './status.model';
import * as statusActions from './status.actions';

const initialValue: Status = {
    isLoading: false
};

export const statusReducer = createReducer(
    initialValue,
    on(
        statusActions.navigateTo,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),

    on(
        statusActions.navigateSuccess,
        (state) => {
            const temp = {
                ...state,
                isLoading: false
            };
            return temp;
        }),

    on(
        statusActions.navigateError,
        (state, { error }) => {
            console.error('Navigation error:', error);
            return state; // No change to state on error
        })
);