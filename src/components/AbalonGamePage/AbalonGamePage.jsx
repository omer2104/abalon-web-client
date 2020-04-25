import React, { useReducer } from 'react'
import BoardGame from '../BoardGame/BoardGame'
import { abalonGameReducer, abalonGameInit } from '../../reducers/abalonGame/abalonGameReducer'
import { AbalonGame, Players } from '../../modules/abalon-game'
import { initialTiles } from './initialBoardState'
import { makeStyles, Typography, Divider } from '@material-ui/core'

export const AbalonGameContext = React.createContext()

const useStyles = makeStyles(theme => ({
    pageTitle: {
        color: "#E4A148",
        fontFamily: "Luminari, fantasy",
    },
    turnHeader: {
        color: '#BCD39C',
        fontSize: 20,
        fontFamily: "Luminari, fantasy",
        position: 'relative',
        right: 5
    },
    appBar: {
        // borderWidth: 1,
        // borderColor: '#E4A148',
        // borderStyle: 'solid',
        // borderTop: 'none',
        // borderLeft: 'none',
        // borderRight: 'none',
        // position: 'relative',
        // left: 15,
        width: '100%',
        display: 'flex',
        alignItems: 'baseline'
    },
    containerBox: {
        height: '100vh'
    },
    boxButton: {
        background: '#BCD39C',
        color: 'white',
        marginTop: 3,
        marginBottom: 3,
    }
}))

const AbalonGamePage = props => {
    const { initialBoardState = initialTiles, againstAI = false } = props
    const [abalonGameState, abalonGameDispatch] = useReducer(abalonGameReducer, initialBoardState, abalonGameInit)

    /**@type {AbalonGame} */
    const abalonGame = abalonGameState.abalonGame
    const classes = useStyles()

    return (
        <AbalonGameContext.Provider value={{ abalonGameState, abalonGameDispatch }}>
            <div>
                <div className={classes.appBar}>
                    <span style={{ flexGrow: 1 }}>
                        <h1 className={classes.pageTitle}>
                            Game Is In Session
                        </h1>
                    </span>
                    <Typography className={classes.turnHeader}>
                        Up Next: {abalonGame.turn === Players.White ? 'White': 'Black'}
                    </Typography>
                </div>
                <Divider style={{ marginBottom: 20 }} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <BoardGame againstAI={againstAI} />
                </div>
            </div>
        </AbalonGameContext.Provider>
    )
}
AbalonGamePage.propTypes = {

}

export default AbalonGamePage
