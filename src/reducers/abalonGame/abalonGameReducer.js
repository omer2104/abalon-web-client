import { AbalonGame } from "../../modules/abalon-game"
import { GAME_FIRST_SELECTION, GAME_SECOND_SELECTION, GAME_RESET_SELECTION, GAME_COMMIT_MOVE, GAME_AI_COMMIT_MOVE } from "./abalonGameTypes"
import { objectShallowClone } from "../../constants"



const abalonGameInit = (initialBoardState) => {
    return {
        abalonGame: new AbalonGame(initialBoardState),
        selectedTileState: null,
        nextMovesPositions: [],
        isAITurn: false,
    }
}

const abalonGameReducer = (state, action) => {
    switch (action.type) {
        case GAME_FIRST_SELECTION: {
            const { tileState, nextMovesPositions } = action.payload
            const { row, column, tile } = tileState
            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)
            
            abalonGameCopy.markTileSelected(row, column)

            // Mark action to the possible moves 
            for (const position of nextMovesPositions) {
                const { row, column } = position
                abalonGameCopy.markTileAction(row, column)
            }

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: tileState,
                nextMovesPositions,
            }
        }  
        case GAME_COMMIT_MOVE: {
            const { newAbalonBoard, againstAI } = action.payload
            const { row, column } = state.selectedTileState

            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)

            // Reset GUI
            abalonGameCopy.unmarkTileSelected(row, column)

            for (const position of state.nextMovesPositions) {
                const { row, column } = position
                abalonGameCopy.unmarkTileAction(row, column)
            }

            // Reload the board to the next board state
            abalonGameCopy.board = newAbalonBoard

            // Toggle Turn
            abalonGameCopy.switchTurn()

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: null,
                nextMovesPositions: [],
                isAITurn: againstAI,
            }
        }
        case GAME_AI_COMMIT_MOVE: {
            const newAbalonBoard = action.payload

            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)

            // Reload the board to the next board state
            abalonGameCopy.board = newAbalonBoard

            // Toggle Turn
            abalonGameCopy.switchTurn()

            return {
                ...state,
                abalonGame: abalonGameCopy,
                isAITurn: false,
            }
        }
        case GAME_SECOND_SELECTION: {
            const tileState = action.payload
            const { row, column, tile } = tileState
            const firstTileState = state.selectedTileState
            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)
            
            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: tileState,
            }
        }
        case GAME_RESET_SELECTION: {
            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)
            const { row, column } = state.selectedTileState

            abalonGameCopy.unmarkTileSelected(row, column)

            // Unmark action of all the action marked tiles
            for (const position of state.nextMovesPositions) {
                const { row, column } = position
                abalonGameCopy.unmarkTileAction(row, column)
            }

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: null,
                nextMovesPositions: [],
            }
        }
        default:
            return state
    }
}

export {
    abalonGameInit,
    abalonGameReducer
}