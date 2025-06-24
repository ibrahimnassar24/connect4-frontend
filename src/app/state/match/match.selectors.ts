import { createFeatureSelector, createSelector } from '@ngrx/store';
import Match from './match.model';

// Define the feature state for match
export const selectMatchState = createFeatureSelector<Match>('match');

// Selector to get the match by ID
export const selectId = (matchId: string) => createSelector(
    selectMatchState,
    (state: Match) => state.id
);

// Selector to get the player1Id of the match
export const selectPlayer1Id = createSelector(
    selectMatchState,
    (state: Match) => state.player1Id
);

// Selector to get the player2Id of the match
export const selectPlayer2Id = createSelector(
    selectMatchState,
    (state: Match) => state.player2Id
);

// Selector to get the winnerId of the match
export const selectWinnerId = createSelector(
    selectMatchState,
    (state: Match) => state.winnerId
);

// Selector to get the status of the match
export const selectStatus = createSelector(
    selectMatchState,
    (state: Match) => state.status
);

// Selector to get the createdAt date of the match
export const selectCreatedAt = createSelector(
    selectMatchState,
    (state: Match) => state.createdAt
);

// Selector to get the updatedAt date of the match
export const selectUpdatedAt = createSelector(
    selectMatchState,
    (state: Match) => state.updatedAt
);