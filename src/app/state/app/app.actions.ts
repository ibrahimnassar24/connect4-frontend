import { createAction, props } from "@ngrx/store";


export const appInitialization = createAction(
    "[App] App Initialization"
);


export const checkForLogin = createAction(
    "[App] Check For Login"
);

export const appInitializationError = createAction(
    "[App] App Initialization Error",
    props<{ error: string}>()
);