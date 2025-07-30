import { createReducer, on } from "@ngrx/store";
import { UserSearchResult } from "../helpers/UserSearchResult";
import { receiveSearchResults } from "./search.actions";

const initialValue: UserSearchResult[] = [];

export const searchReducer = createReducer(
    initialValue,

    on(
        receiveSearchResults,
        ( state, { results}) => {
            return [
                ...results
            ];
        }
    )
);