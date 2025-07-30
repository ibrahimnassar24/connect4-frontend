import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Status } from "./status.model";

export const statusSelected = createFeatureSelector<Status>('status');

export const selectIsLoading = createSelector(
    statusSelected,
    (state) => state.isLoading
);

export const selectMode = createSelector(
    statusSelected,
    ( state ) => state.isDarkMode
);

export const selectCurrentLocation = createSelector(
    statusSelected,
    ( state ) => state.currentLocation
);

export const selectIsLoggedIn = createSelector(
    statusSelected,
    ( state ) => state.isLoggedIn
);