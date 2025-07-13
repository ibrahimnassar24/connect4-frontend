import { createReducer, on, props } from "@ngrx/store";
import { Match } from "./match.model";
import * as matchActions from "./match.actions";
import Movement from "../helpers/movement";
import { Grid } from "../helpers/grid";

const initialValue: Match = {
    id: null,
    firstPlayer: null,
    secondPlayer: null,
    winner: null,
    status: "PENDING",
    createdAt: null,
    updatedAt: null
};

export const matchReducer = createReducer(
    initialValue,


    on(
        matchActions.addMovement,
        (state, movement) => {
            const temp = new Grid(state.grid!);
            const grid = temp.addMovement(movement);
            return {
                ...state,
                grid
            };
        }
    ),



    on(
        matchActions.matchStarted,
        (state, { match }) => {
            return {
                ...state,
                ...match,
                grid: Grid.buildGrid(7, 6)
            };
        }
    ),

    on(
        matchActions.waitingFroResponse,
        ( state, { match }) => {
            return {
                ...state,
                ...match
            };
        }
    ),


    on(
        matchActions.matchFinished,
        (state, { winner }): Match => {
            return {
                ...state,
                winner,
                status: "FINISHED"
            };
        }
    ),

    
    on(
        matchActions.changeTurn,
        (state, { turn }) => {
            return {
                ...state,
                turn
            };
        }
    ),



    on(
        matchActions.reset,
        (state) => {
            return initialValue;
        }
    )
);

