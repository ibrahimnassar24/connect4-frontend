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

export const navigateToOthersProfileView = createAction(
    "[Status] Navigate To Others Profile View",
    props<{ email: string }>()
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


export const navigateError = createAction(
    '[Status] Navigate Error',
    props<{ error: any }>()
);

export const changeMode = createAction(
    "[Status] Change Mode"
);

export const navigateToSearchResults = createAction(
    "[Status] Navigate To Search Results"
);

export const login = createAction(
    "[Status] Log In"
);

export const logOut = createAction(
    "[Status] Log Out"
);

export const saveCurrentLocation = createAction(
    "[Status] Save Current Location"
);

export const saveCurrentLocationsuccess = createAction(
    "[Status] Save Current Location Success",
    props<{ location: string}>()
);

export const goToSavedLocation = createAction(
    "[Status] Go To Saved Location"
);
export const goToSavedLocationSuccess = createAction(
    "[Status] Go To Saved Location Success"
);