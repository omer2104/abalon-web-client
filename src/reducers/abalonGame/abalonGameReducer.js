import { AbalonGame } from "../../modules/abalon-game"
import { GAME_FIRST_SELECTION } from "./abalonGameTypes"
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

            return {
                ...state,
                abalonGame: abalonGameCopy,
                selectedTileState: tileState,
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