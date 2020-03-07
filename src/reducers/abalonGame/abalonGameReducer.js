import { AbalonGame } from "../../modules/abalon-game"



const abalonGameInit = (initialBoardState) => {

    return {
        abalonGame: new AbalonGame(initialBoardState),
        selectedTile: null
    }
}

const abalonGameReducer = (state, action) => {
    switch (action.type) {
        case "value": {
            return state
        }  
        default:
            return state
    }
}

export {
    abalonGameInit,
    abalonGameReducer
}