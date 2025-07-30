import { createAction, props } from "@ngrx/store";
import SignUserForm from "../helpers/signUserForm";

// Define the action types
export const register = createAction(
    "[User] Register",
    props<SignUserForm>()
);

export const registerSuccess = createAction(
    "[User] Register Success",
    props<{ email: string }>()
);

export const logIn = createAction(
    "[User] Log In",
    props<SignUserForm>()
);

export const logInSuccess = createAction(
    "[User] Log In Success",
    props<{ email: string }>()
);

export const logOut = createAction(
    "[User] Log Out"
);

export const logOutSuccess = createAction(
    "[User] Log Out Success"
);

export const authError = createAction(
    "[User] Auth Error",
    props<{ error: string }>()
);