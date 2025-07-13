import { createAction, props } from "@ngrx/store";
import { Notification } from "./notification.model";

export const notificationReceived = createAction(
    "[notification] Notification Received",
    props<{ notification: Notification}>()
);

export const listenForNotifications = createAction(
    "[Notification] Listen For Notifications"
);