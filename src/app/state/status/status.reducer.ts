import { createReducer, on } from '@ngrx/store';
import { Status } from './status.model';
import * as statusActions from './status.actions';

const initialValue: Status = {
    isLoading: false
};

export const statusReducer = createReducer(
    initialValue,
    on(
        statusActions.navigateToHome,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToRegister,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToLogin,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToProfileEdit,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToProfileView,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToNotifications,
        (state) => {
            const temp = {
                ...state,
                isLoading: true
            };
            return temp;
        }),


    on(
        statusActions.navigateToPlay,
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