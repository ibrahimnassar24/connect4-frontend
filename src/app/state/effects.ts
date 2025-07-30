import { UserEffects } from "./user/user.effects";
import { ProfileEffects } from "./profile/profile.effects";
import { StatusEffects } from "./status/status.effects";
import { AppEffects } from "./app/app.effects";
import { MatchEffects } from "./match/match.effects";
import { NotificationEffects } from "./notification/notification.effects";
import { SearchEffects } from "./search/search.effects.ts";
import { DialogEffects } from "./dialog/dialog.effects";

export const effects = [
    UserEffects,
    ProfileEffects,
    StatusEffects,
    AppEffects,
    MatchEffects,
    NotificationEffects,
    SearchEffects,
    DialogEffects
];