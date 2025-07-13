import User from "./user/user.model";
import { Status } from "./status/status.model";
import Profile from "./profile/profile.model";
import { Match } from "./match/match.model";

interface State {
    user: User;
    status: Status;
    profile: Profile;
    match: Match;
};

export default State;