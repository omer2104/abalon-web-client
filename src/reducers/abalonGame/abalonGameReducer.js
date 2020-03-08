import { AbalonGame } from "../../modules/abalon-game"
import { GAME_FIRST_SELECTION, GAME_SECOND_SELECTION, GAME_RESET_SELECTION } from "./abalonGameTypes"
import { objectShallowClone } from "../../constants"



const abalonGameInit = (initialBoardState) => {

    return {
        abalonGame: new AbalonGame(initialBoardState),
        selectedTileState: null
    }
}

const abalonGameReducer = (state, action) => {
    switch (action.type) {
        case GAME_FIRST_SELECTION: {
            const tileState = action.payload
            const { row, column, tile } = tileState
            /**@type {AbalonGame} */
            const abalonGameCopy = objectShallowClone(state.abalonGame, AbalonGame.prototype)
            
            abalonGameCopy.markTileSelected(row, column)

            // [TODO] add mark action to the possible moves when they will be provided

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: tileState,
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

            // [TODO] add unmark action of all the action marked tiles

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: null
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