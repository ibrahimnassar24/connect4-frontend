import { createAction, props } from "@ngrx/store";
import { UserSearchResult } from "../helpers/UserSearchResult";

export const getSearchResults = createAction(
    "[Search] Get Search Results",
    props<{ query: string}>()
);

export const receiveSearchResults = createAction(
    "[Search] Receive Search Results",
    props<{ results: UserSearchResult[]}>()
);

export const searchError = createAction(
    "[Search] Search Error",
    props<{ error: string}>()
);