import { createAction, props } from "@ngrx/store";

export const navigateTo = createAction(
    '[Status] Navigate To',
    props<{ path: string }>()
);

export const navigateSuccess = createAction(
    '[Status] Navigate Success',
);

export const navigateError = createAction(
    '[Status] Navigate Error',
    props<{ error: any }>()
);