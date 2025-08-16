import { createAction, props } from "@ngrx/store";
import Movement from "../helpers/movement";
import { Match } from "./match.model";

export const createMatch = createAction(
    "[Match] Create Match",
    props<{ firstPlayer: string, secondPlayer: string }>()
);



export const createInvitation = createAction(
    "[Match] Create Invitation",
    props<{ email: string }>()
);

export const invitationSubmitted = createAction(
    "[Match] Invitation Submitted",
    props<{ invitationId: string }>()
);

export const startInvitationResponseTimer = createAction(
    "[Match] Start Invitation Response Timer"
);

export const stopInvitationResponseTimer = createAction(
    "[Match] Stop Invitation Response Timer"
);


export const withdrawInvitation = createAction(
    "[Match] Withdraw Invitation",
    props<{ invitationId: string }>()
)

export const acceptInvitation = createAction(
    "[Match] Accept Invitation",
    props<{ id: string }>()
);

export const declineInvitation = createAction(
    "[Match] Decline Invitation",
    props<{ id: string }>()
);

export const invitationDeclined = createAction(
    "[Match] Invitation Declined"
);

export const listenForInvitationNotifications = createAction(
    "[Match] Listen For Invitation Notifications"
);

export const stopListeningForInvitationNotifications = createAction(
    "[Match] Stop Listening For Invitation Notifications"
);

export const joinMatch = createAction(
    "[Match] Join Match",
    props<{ matchId: string }>()
);

export const matchStarted = createAction(
    "[Match] Match Started",
    props<{ match: Match }>()
);

export const listenForMatchNotifications = createAction(
    "[Match] Listen For Match Notifications"
);

export const stopListeningForMatchNotification = createAction(
    "[Match} Stop Listening For Match Notifications"
);

export const matchFinished = createAction(
    "[Match] Match Finished",
);


export const changeTurn = createAction(
    "[Match] Change Turn",
    props<{ turn: string }>()
);

export const matchLost = createAction(
    "[Match] Match Lost"
);

export const matchWon = createAction(
    "[Match] Match Won",
);

export const matchForfitted = createAction(
    "[Match] Match Forfitted"
);


export const addMovement = createAction(
    "[Match] Add Movement",
    props<Movement>()
);

export const sendMovement = createAction(
    "[Match] Send Movement",
    props<{ movement: Movement }>()
);

export const receiveMovement = createAction(
    "[Match] Receive Movement",
    props<{ movement: Movement }>()
);



export const matchError = createAction(
    "[Match] Match Error",
    props<{ msg: string }>()
);

export const matchWarning = createAction(
    "[Match] Match Warning",
    props<{ msg: string}>()
);

export const reset = createAction(
    "[Match] Reset"
);