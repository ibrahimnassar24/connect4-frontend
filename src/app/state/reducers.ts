import { ActionReducerMap } from '@ngrx/store';
import State from './state.model';
import { userReducer } from './user/user.reducer';
import { profileReducer } from './profile/profile.reducer';
import { statusReducer } from './status/status.reducer';
import { notificationReducer } from './notification/notification.reducer';
import { matchReducer } from './match/match.reducer';

export const reducers: ActionReducerMap<any> = {
    user: userReducer,
    profile: profileReducer,
    status: statusReducer,
    notifications: notificationReducer,
    match: matchReducer
};