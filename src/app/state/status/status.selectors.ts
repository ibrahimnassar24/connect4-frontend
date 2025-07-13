import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Status } from "./status.model";

export const statusSelected = createFeatureSelector<Status>('status');

export const selectIsLoading = createSelector(
    statusSelected,
    (state) => state.isLoading
);