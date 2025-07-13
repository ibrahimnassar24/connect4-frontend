import { UserEffects } from "./user/user.effects";
import { ProfileEffects } from "./profile/profile.effects";
import { StatusEffects } from "./status/status.effects";
import { AppEffects } from "./app/app.effects";
import { MatchEffects } from "./match/match.effects";
import { NotificationEffects } from "./notification/notification.effects";

export const effects = [
    UserEffects,
    ProfileEffects,
    StatusEffects,
    AppEffects,
    MatchEffects,
    NotificationEffects
];