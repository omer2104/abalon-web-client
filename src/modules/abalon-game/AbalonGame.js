import { AbalonBoard } from "./AbalonBoard"
import { Players } from "./AbalonGameConstants";

class AbalonGame {
    constructor(initialBoardState = [], turn = Players.Black) {
        this.board = new AbalonBoard(initialBoardState)
        this.turn = turn
    }
}

export {
    AbalonGame
}