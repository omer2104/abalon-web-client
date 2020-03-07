import { AbalonBoardTile } from "./AbalonBoardTile"
import { TileContent } from "./AbalonGameConstants"

/*
logic representation: 

1         [1, 2, 3, 4, 5]
2        [1, 2, 3, 4, 5, 6]
3      [1, 2, 3, 4, 5, 6, 7]
4    [1, 2, 3, 4, 5, 6, 7, 8]
5   [1, 2, 3, 4, 5, 6, 7, 8, 9]
6    [1, 2, 3, 4, 5, 6, 7, 8]
7      [1, 2, 3, 4, 5, 6, 7]
8        [1, 2, 3, 4, 5, 6]
9         [1, 2, 3, 4, 5]

inside the matrix, all the numbers above will be decremented (because arrays start at index 0)
*/

/**
 * 
 * @param {Number} num 
 */
const mathFunction = (num) => {
    if (num >=0 && num <= 4) {
        return num
    } else if (num >=5 && num <= 8) {
        return 8 - num
    }
    return 0
}

class AbalonBoard {
    /**
     * 
     * @param {Array<{row: Number, column: Number, tile: AbalonBoardTile}>} initialValues 
     */
    constructor(initialValues = []) {
        /**@type {Array<Array<AbalonBoardTile>>} */
        this.boardMat = []

        for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
            const row = new Array(5 + mathFunction(rowIndex))

            for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
                const initTileState = initialValues.find(x => x.row === rowIndex && x.column === columnIndex)

                if (initTileState) {
                    row[columnIndex] = initTileState.tile
                } else {
                    row[columnIndex] = new AbalonBoardTile(TileContent.Empty)
                }
            }

            this.boardMat.push(row)
        }
    }

    /**
     * 
     * @param {Number} row 
     * @param {Number} column 
     * @returns {AbalonBoardTile}
     */
    getTile(row, column) {
        return this.boardMat[row][column]
    }

    /**
     * @returns {Array<Array<{row: Number, column: Number, tile: AbalonBoardTile}>>}
     */
    getBoardState() {
        const boardState = []

        for (let i = 0; i < this.boardMat.length; i++) {
            const row = this.boardMat[i];
            
            const rowState = []
            for (let j = 0; j < row.length; j++) {
                const tile = row[j];
                
                rowState.push({
                    row: i, column: j, tile
                })
            }

            boardState.push(rowState)
        }

        return boardState
    }
}

export {
    AbalonBoard
}