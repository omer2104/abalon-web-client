import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { blackBallURL, backBoardURL, whiteBallURL, emptyMarkedURL, blackBallYellowURL,
            whiteBallYellowURL } from "../../assets";
import { Stage, Layer, Image } from 'react-konva'
import useImage from "use-image";
import { AbalonGame, AbalonBoardTile, TileContent } from '../../modules/abalon-game';
import { AbalonGameContext } from '../AbalonGamePage/AbalonGamePage';
import { gameFirstSelection } from '../../reducers/abalonGame/abalonGameActions';

const TILE_SIZE = 25
const PADDING_SIZE_X = 10
const PADDING_SIZE_Y = 6

const mathFunction = (num) => {
    if (num >=0 && num <= 4) {
        return num
    } else if (num >=5 && num <= 8) {
        return 8 - num
    }
    return 0
}

const tilePositionToCoordinates = (row, column) => {
    const rowOffset = (4 - mathFunction(row)) * 25 / 2

    return {
        x: rowOffset + TILE_SIZE * column + PADDING_SIZE_X * column + 65,
        y: TILE_SIZE * row + 38 + PADDING_SIZE_Y * row
    }
}

const BoardGame = props => {
    const { abalonGameState, abalonGameDispatch } = useContext(AbalonGameContext)

    const [blackBallImage] = useImage(blackBallURL)
    const [whiteBallImage] = useImage(whiteBallURL)
    const [blackBallYellowImage] = useImage(blackBallYellowURL)
    const [whiteBallYellowImage] = useImage(whiteBallYellowURL)
    const [backBoardImage] = useImage(backBoardURL)
    const [emptyMarkedImage] = useImage(emptyMarkedURL)
    
    const { selectedTileState } = abalonGameState
    /**@type {AbalonGame} */
    const abalonGame = abalonGameState.abalonGame
    const boardState = abalonGame.board.getBoardState()
    
    /**
     * @param {AbalonBoardTile} tile
     */
    const tileToImage = (tile) => {
        switch (tile.content) {
            case TileContent.WhiteSoldier:
                return whiteBallImage
            case TileContent.BlackSoldier:
                return blackBallImage
            case TileContent.BlackSoldierMarkedSelection:
                return blackBallYellowImage
            case TileContent.WhiteSoldierMarkedSelection:
                return whiteBallYellowImage
            case TileContent.Empty:
                return ''
            default:
                return ''
        }
    }

    /**
     * @param {import('konva/types/Node').KonvaEventObject<MouseEvent>} e 
     * @param {{row: Number, column: Number, tile: AbalonBoardTile}} tileState
     * */
    const handleTileClick = (e, tileState) => {
        const { row, column, tile } = tileState
        
        if (selectedTileState === null) { // If first select
            // [TODO] fetch from server possible moves

            abalonGameDispatch(gameFirstSelection(tileState))
        } else { // If second select

        }
    }

    return (
        <Stage width={500} height={500}>
            <Layer>
                <Image image={backBoardImage}  />
                {boardState.map(rowState => (
                    rowState.map((tileState) => {
                        const { x, y } = tilePositionToCoordinates(tileState.row, tileState.column) 
                        return (
                            <Image 
                                key={`${tileState.row} ${tileState.column}`}
                                image={tileToImage(tileState.tile)}
                                width={TILE_SIZE}
                                height={TILE_SIZE}
                                x={x}
                                y={y}
                                onClick={(e) => handleTileClick(e, tileState)}
                                onMouseEnter={(e) => {
                                    if (tileState.tile.content !== TileContent.Empty) {
                                        document.body.style.cursor = 'pointer'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    document.body.style.cursor = 'default'
                                }}
                            />
                        )
                    })
                ))}
            </Layer>
        </Stage>
    )
}

BoardGame.propTypes = {

}

export default BoardGame
