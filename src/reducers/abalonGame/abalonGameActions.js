import { GAME_FIRST_SELECTION, GAME_SECOND_SELECTION, GAME_RESET_SELECTION } from "./abalonGameTypes"


export const gameFirstSelection = (tileState) => {
    return {
        type: GAME_FIRST_SELECTION,
        payload: tileState
    }
}

export const gameSecondSelection = (tileState) => {
    return {
        type: GAME_SECOND_SELECTION,
        payload: tileState
    }
}

export const gameResetSelection = () => {
    return {
        type: GAME_RESET_SELECTION
    }
}