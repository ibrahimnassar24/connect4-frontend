import { createAction, props } from "@ngrx/store";
import Movement from "../helpers/movement";
import { Match } from "./match.model";

export const createMatch = createAction(
    "[Match] Create Match",
props<{ firstPlayer: string, secondPlayer: string}>()
);


export const matchStarted = createAction(
    "[Match] Match Started",
    props<{ match: Match}>()
);

export const waitingFroResponse = createAction(
    "[Match] Waiting For Response",
    props<{ match: Match}>()
);

export const acceptInvitation = createAction(
    "[Match] Accept Inivitation",
    props<{ id: string}>()
);

export const declineInvitation = createAction(
    "[Match] Decline Invitation",
    props<{ id: string }>()
);

export const matchFinished = createAction(
    "[Match] Match Finished",
    props<{ winner: string}>()
);


export const changeTurn = createAction(
    "[Match] Change Turn",
    props<{ turn: string}>()
);

export const matchLost = createAction(
    "[Match] Match Lost"
);

export const matchWon = createAction(
    "[Match] Match Won",
    props<{winner: string}>()
);


export const addMovement = createAction(
    "[Match] Add Movement",
    props<Movement>()
);

export const sendMovement = createAction(
    "[Match] Send Movement",
    props<{ movement: Movement}>()
);

export const receiveMovement = createAction(
    "[Match] Receive Movement",
    props<{ movement: Movement}>()
);



export const matchError = createAction(
    "[Match] Match Error",
    props<{ msg: string}>()
);

export const reset = createAction(
    "[Match] Reset"
);