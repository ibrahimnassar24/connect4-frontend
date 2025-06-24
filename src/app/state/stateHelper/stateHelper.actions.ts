import { createAction, props } from "@ngrx/store";

export const navigateTo = createAction(
    '[State Helper] Navigate To',
    props<{ path: string }>()
);