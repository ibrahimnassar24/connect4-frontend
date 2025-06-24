import { createFeatureSelector, createSelector } from '@ngrx/store';
import User from './user.model';

// Define the feature state for user
export const selectUserState = createFeatureSelector<User>('user');

// Selector to get the user email
export const selectUserEmail = createSelector(
    selectUserState,
    (state: User) => state.email
    );