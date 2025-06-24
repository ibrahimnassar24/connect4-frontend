import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user/user.reducer';
import State from './state.model';
import { statusReducer } from './status/status.reducer';

export const reducers: ActionReducerMap<any> = {
    user: userReducer,
    status: statusReducer
};