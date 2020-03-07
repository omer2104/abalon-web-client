import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { blackBallURL, backBoardURL, whiteBallURL, emptyMarkedURL } from "../../assets";
import { Stage, Layer, Image } from 'react-konva'
import useImage from "use-image";
import { AbalonBoard, AbalonBoardTile, TileContent } from '../../modules/abalon-game';
import { AbalonGameContext } from '../AbalonGamePage/AbalonGamePage';

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
    const [backBoardImage] = useImage(backBoardURL)
    const [emptyMarkedImage] = useImage(emptyMarkedURL)
    
    const { abalonGame } = abalonGameState
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
            case TileContent.Empty:
                return ''
            default:
                return ''
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
                                onClick={(e) => {
                                    console.log(e)
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
