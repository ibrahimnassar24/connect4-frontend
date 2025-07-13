import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Notification } from "./notification.model";

export const selectNotifications = createFeatureSelector<Notification[]>('notifications');