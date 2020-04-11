import { GAME_FIRST_SELECTION, GAME_SECOND_SELECTION, GAME_RESET_SELECTION, GAME_COMMIT_MOVE, GAME_AI_COMMIT_MOVE } from "./abalonGameTypes"


export const gameFirstSelection = (tileState, nextMovesPositions) => {
    return {
        type: GAME_FIRST_SELECTION,
        payload: { tileState, nextMovesPositions }
    }
}

export const gameCommitMove = (newAbalonBoard, againstAI) => {
    return {
        type: GAME_COMMIT_MOVE,
        payload: { newAbalonBoard, againstAI }
    }
}

export const gameAICommitMove = (newAbalonBoard) => {
    return {
        type: GAME_AI_COMMIT_MOVE,
        payload: newAbalonBoard
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