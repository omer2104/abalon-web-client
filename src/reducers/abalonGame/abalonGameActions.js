import { GAME_FIRST_SELECTION } from "./abalonGameTypes"


export const gameFirstSelection = (tileState) => {
    return {
        type: GAME_FIRST_SELECTION,
        payload: tileState
    }
}