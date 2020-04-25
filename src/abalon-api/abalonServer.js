import { AbalonBoard, Players, AbalonBoardTile, TileContent } from "../modules/abalon-game";

const promiseTimeout = function(ms, promise) {
    // Create a promise that rejects in <ms> milliseconds
    let timeout = new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            clearTimeout(id);
            reject('Timed out in '+ ms + 'ms.')
        }, ms)
    })
  
    // Returns a race between our timeout and the passed in promise
    return Promise.race([
        promise,
        timeout
    ])
}

//#region CONVERTERS
/**
 *  
 * @param {String} turn 
 */
const turnConverter = (turn) => {
    switch (turn) {
        case Players.Black: return "BLACK"
        case Players.White: return "WHITE"
        default: return ""
    }
}
/**
 *  
 * @param {String} turn 
 */
const turnConverterToEnum = (player) => {
    switch (player) {
        case "BLACK": return Players.Black
        case "WHITE": return Players.White
        default: return ""
    }
}
/**
 * 
 * @param {AbalonBoard} boardState 
 */
const boardStateConverter = (boardState) => {
    const board = []

    for (const rowState of boardState.getBoardState()) {
        for (const tileState of rowState) {
            const { row, column, tile } = tileState
            
            if (tile.isBlackSoldier()) {
                board.push({ row, column, soldier: "BLACK"})
            } else if (tile.isWhiteSoldier()) {
                board.push({ row, column, soldier: "WHITE"})
            }
        }
    }

    return board
}
const soldierToTile = (soldier) => {
    switch (soldier) {
        case "WHITE": return new AbalonBoardTile(TileContent.WhiteSoldier)
        case "BLACK": return new AbalonBoardTile(TileContent.BlackSoldier)
        default: return new AbalonBoardTile(TileContent.Empty)
    }
}
/**
 * 
 * @param {Array<{row: Number, column: Number, soldier: String}>} board 
 */
const boardStateConverterToObj = (board) => {
    const initialValues = []

    for (const square of board) {
        const { row, column, soldier } = square

        initialValues.push({
            row, column, tile: soldierToTile(soldier)
        })
    }
    return new AbalonBoard(initialValues)
}
//#endregion

/**
 * 
 * @param {Number} msTimeout 
 * @returns {Promise}
 */
const connectionTest = (msTimeout = 10 * 1000) => {
    return promiseTimeout(msTimeout, new Promise((resolve, reject) => {
        fetch("/api/health", {
            method: 'GET',
        })
            .then(resp => resp.text())
            .then(data => resolve(data))
            .catch(err => reject(err))
    }))
}

/**
 * 
 * @param {String} turn 
 * @param {{row: Number, column: Number}} position 
 * @param {AbalonBoard} boardState 
 * @param {Number} msTimeout 
 * @returns {Promise}
 */
const getPossibleNextMoves = (turn, position, boardState, msTimeout = 10 * 1000) => {
    const data = {
        currentTurn: turnConverter(turn),
        currentPos: position,
        boardState: boardStateConverter(boardState)
    }

    return promiseTimeout(msTimeout, new Promise((resolve, reject) => {
        fetch("/api/abalongame/moves/all", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    }))
}

/**
 * 
 * @param {String} turn 
 * @param {{row: Number, column: Number}} sourcePosition 
 * @param {{row: Number, column: Number}} destPosition 
 * @param {AbalonBoard} boardState 
 * @param {Number} msTimeout 
 * @returns {Promise<AbalonBoard>}
 */
const commitMove = (turn, sourcePosition, destPosition, boardState, msTimeout = 10 * 1000) => {
    const data = {
        currentTurn: turnConverter(turn),
        sourcePosition: sourcePosition,
        destPosition: destPosition,
        boardState: boardStateConverter(boardState)
    }

    return promiseTimeout(msTimeout, new Promise((resolve, reject) => {
        fetch("/api/abalongame/moves/execute", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(data => {
                return boardStateConverterToObj(data);
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    }))
}

/**
 * 
 * @param {AbalonBoard} boardState 
 * @param {Boolean} againstAI
 * @param {Number} msTimeout 
 */
const checkWinner = (boardState, againstAI, msTimeout = 10 * 1000) => {
    const data = {
        boardState: boardStateConverter(boardState),
        againstAI
    }

    return promiseTimeout(msTimeout, new Promise((resolve, reject) => {
        fetch("/api/abalongame/rules/winner", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.text())
            .then(data => turnConverterToEnum(data))
            .then(data => resolve(data))
            .catch(err => reject(err))
    }))
}

/**
 * 
 * @param {String} turn 
 * @param {AbalonBoard} boardState 
 * @param {Number} msTimeout 
 * @returns {Promise<AbalonBoard>}
 */
const getMoveFromAI = (turn, boardState, msTimeout = 10 * 1000) => {
    const data = {
        currentTurn: turnConverter(turn),
        boardState: boardStateConverter(boardState)
    }

    return promiseTimeout(msTimeout, new Promise((resolve, reject) => {
        fetch("/api/abalongame/moves/ai", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(data => {
                return boardStateConverterToObj(data);
            })
            .then(data => resolve(data))
            .catch(err => reject(err))
    }))
}

export {
    connectionTest,
    getPossibleNextMoves,
    commitMove,
    checkWinner,
    getMoveFromAI,
}