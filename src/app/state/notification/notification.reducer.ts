import { createReducer, on } from "@ngrx/store";
import { Notification } from "./notification.model";
import* as notificationActions from "./notification.actions";


const initialValue: Notification[] = [];

export const notificationReducer = createReducer(
    initialValue,
    on(
        notificationActions.notificationReceived,
        (state, { notification }) => {

            return [
                notification,
                ...state
            ];
        }
    )
);