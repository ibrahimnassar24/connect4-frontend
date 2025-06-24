import { UserEffects } from "./user/user.effects";
import { StatusEffects } from "./status/status.effects";
import { StateHelperEffects } from "./stateHelper/stateHelper.effects";

export const effects = [
    UserEffects,
    StatusEffects,
    StateHelperEffects
];