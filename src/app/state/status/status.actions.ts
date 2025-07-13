import { createAction, props } from "@ngrx/store";

export const navigateToHome = createAction(
    '[Status] Navigate To Home',
);

export const navigateToRegister = createAction(
    "[Status] Navigate To Register"
);

export const navigateToLogin = createAction(
    "[Status] Navigate To Log In",
);

export const navigateToProfileEdit = createAction(
    "[Status] Navigate To Profile Edit"
);

export const navigateToProfileView = createAction(
    "[Status] Navigate To Profile View"
);

export const navigateToNotifications = createAction(
    "[Status] Navigate To Notifications"
);

export const navigateToPlay = createAction(
    "[Status] Navigate To Play"
);

export const navigateSuccess = createAction(
    '[Status] Navigate Success',
);

export const redirect = createAction(
    "[Status] Redirect",
    props<{ path: string[]}>()
);

export const navigateError = createAction(
    '[Status] Navigate Error',
    props<{ error: any }>()
);