import { AbalonBoard } from "./AbalonBoard"
import { Players, TileContent } from "./AbalonGameConstants";

class AbalonGame {
    constructor(initialBoardState = [], turn = Players.Black) {
        /**@member {AbalonBoard} */
        this.board = new AbalonBoard(initialBoardState)
        /**@member {String} */
        this.turn = turn
    }

    switchTurn() {
        if (this.turn === Players.Black) {
            this.turn = Players.White
        } else if (this.turn === Players.White) {
            this.turn = Players.Black
        }
    }

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @returns {Boolean} true if tile could be marked, otherwise false
     */
    markTileSelected(row, column) {
        const { content } = this.board.getTile(row, column)
        
        switch (content) {
            case TileContent.BlackSoldier:
                this.board.setTile(row, column, TileContent.BlackSoldierMarkedSelection)
                return true
            case TileContent.WhiteSoldier:
                this.board.setTile(row, column, TileContent.WhiteSoldierMarkedSelection)
                return true
            default:
                return false
        }
    }

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @returns {Boolean} true if tile could be marked, otherwise false
     */
    markTileAction(row, column) {
        const { content } = this.board.getTile(row, column)
        
        switch (content) {
            case TileContent.BlackSoldier:
                this.board.setTile(row, column, TileContent.BlackSoldierMarkedAction)
                return true
            case TileContent.WhiteSoldier:
                this.board.setTile(row, column, TileContent.WhiteSoldierMarkedAction)
                return true
            case TileContent.Empty:
                this.board.setTile(row, column, TileContent.EmptyMarkedAction)
                return true
            default:
                return false
        }
    }

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @returns {Boolean} true if tile could be marked, otherwise false
     */
    unmarkTileSelected(row, column) {
        const { content } = this.board.getTile(row, column)
        
        switch (content) {
            case TileContent.BlackSoldierMarkedSelection:
                this.board.setTile(row, column, TileContent.BlackSoldier)
                return true
            case TileContent.WhiteSoldierMarkedSelection:
                this.board.setTile(row, column, TileContent.WhiteSoldier)
                return true
            default:
                return false
        }
    }

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @returns {Boolean} true if tile could be marked, otherwise false
     */
    unmarkTileAction(row, column) {
        const { content } = this.board.getTile(row, column)
        
        switch (content) {
            case TileContent.BlackSoldierMarkedAction:
                this.board.setTile(row, column, TileContent.BlackSoldier)
                return true
            case TileContent.WhiteSoldierMarkedAction:
                this.board.setTile(row, column, TileContent.WhiteSoldier)
                return true
            case TileContent.EmptyMarkedAction:
                this.board.setTile(row, column, TileContent.Empty)
                return true
            default:
                return false
        }
    }
}

export {
    AbalonGame
}