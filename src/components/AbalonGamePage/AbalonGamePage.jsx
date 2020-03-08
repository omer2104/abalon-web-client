import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import BoardGame from '../BoardGame/BoardGame'
import { abalonGameReducer, abalonGameInit } from '../../reducers/abalonGame/abalonGameReducer'
import { AbalonBoardTile, TileContent } from '../../modules/abalon-game'
import { initialTiles } from './initialBoardState'

export const AbalonGameContext = React.createContext()

const AbalonGamePage = props => {
    const { initialBoardState = initialTiles } = props
    const [abalonGameState, abalonGameDispatch] = useReducer(abalonGameReducer, initialBoardState, abalonGameInit)

    return (
        <AbalonGameContext.Provider value={{ abalonGameState, abalonGameDispatch }}>
            <div>
                <h1>Game Is In Session</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BoardGame />
                </div>
            </div>
        </AbalonGameContext.Provider>
    )
}
AbalonGamePage.propTypes = {

}

export default AbalonGamePage
