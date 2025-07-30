import { createFeatureSelector } from "@ngrx/store";
import { UserSearchResult } from "../helpers/UserSearchResult";

export const selectSearchResults = createFeatureSelector<UserSearchResult[]>('searchResults');