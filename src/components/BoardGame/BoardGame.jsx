import React, { useContext, useEffect, useState } from 'react'
import { blackBallURL, backBoardURL, whiteBallURL, emptyMarkedURL, blackBallYellowURL,
            whiteBallYellowURL, whiteBallMarkedURL, blackBallMarkedURL } from "../../assets";
import { Stage, Layer, Image } from 'react-konva'
import useImage from "use-image";
import { AbalonGame, AbalonBoardTile, TileContent, Players } from '../../modules/abalon-game';
import { AbalonGameContext } from '../AbalonGamePage/AbalonGamePage';
import { gameFirstSelection, gameResetSelection, gameCommitMove, gameAICommitMove } from '../../reducers/abalonGame/abalonGameActions';
import { getPossibleNextMoves, commitMove, checkWinner, getMoveFromAI } from '../../abalon-api';
import { useSnackbar } from 'notistack';
import { CircularProgress, Typography, Box } from '@material-ui/core';

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

const mathFunction2 = (num) => {
    switch (num) {
        case 0: return 0
        case 1: return 2
        case 2: return 8
        case 3: return 11
        case 4: return 18
        case 5: return 11
        case 6: return 8
        case 7: return 2
        case 8: return 0
        default: return 0
    }
}

const tilePositionToCoordinates = (row, column) => {
    const rowOffset = (4 - mathFunction(row)) * 25 / 2 - mathFunction2(row)

    return {
        x: rowOffset + TILE_SIZE * column + PADDING_SIZE_X * column + 65,
        y: TILE_SIZE * row + 38 + PADDING_SIZE_Y * row
    }
}

const BoardGame = props => {
    const { againstAI } = props
    const { abalonGameState, abalonGameDispatch } = useContext(AbalonGameContext)

    const [blackBallImage] = useImage(blackBallURL)
    const [whiteBallImage] = useImage(whiteBallURL)
    const [blackBallYellowImage] = useImage(blackBallYellowURL)
    const [whiteBallYellowImage] = useImage(whiteBallYellowURL)
    const [backBoardImage] = useImage(backBoardURL)
    const [emptyMarkedImage] = useImage(emptyMarkedURL)
    const [whiteBallMarkedImage] = useImage(whiteBallMarkedURL)
    const [blackBallMarkedImage] = useImage(blackBallMarkedURL)
    
    const { enqueueSnackbar } = useSnackbar();

    const [winnerAlreadyAnnounced, setWinnerAlreadyAnnounced] = useState(false)

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
            case TileContent.EmptyMarkedAction:
                return emptyMarkedImage
            case TileContent.WhiteSoldierMarkedAction:
                return whiteBallMarkedImage
            case TileContent.BlackSoldierMarkedAction:
                return blackBallMarkedImage
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
            if ((tile.isBlackSoldier() && abalonGame.turn === Players.White) ||
                (tile.isWhiteSoldier() && abalonGame.turn === Players.Black)) {
                enqueueSnackbar("Mind the current turn!")
            }

            // Fetch from server possible moves and add it to the action and state
            getPossibleNextMoves(abalonGame.turn, { row, column }, abalonGame.board)
                .then(nextMovesPositions => {
                    abalonGameDispatch(gameFirstSelection(tileState, nextMovesPositions))
                }).catch(err => {
                    enqueueSnackbar("There has been an error reaching the server", {
                        variant: "error",
                    })
                })
        } else { // If second select
            // Check with state if the move is valid (compare the destination with possible moves in state)
            if (abalonGameState.nextMovesPositions.find(pos => pos.row === row && pos.column === column)) {
                // If it is, execute move with server and dispatch the new board 
                const sourcePosition = {
                    row: abalonGameState.selectedTileState.row,
                    column: abalonGameState.selectedTileState.column
                }

                commitMove(abalonGame.turn, sourcePosition, { row, column }, abalonGame.board)
                    .then(newAbalonBoard => {
                        abalonGameDispatch(gameCommitMove(newAbalonBoard, againstAI))
                    })
                    .catch(err => {
                        enqueueSnackbar("There has been an error reaching the server", {
                            variant: "error",
                        })
                    })
            } else {
                abalonGameDispatch(gameResetSelection())
            }
        }
    }

    useEffect(() => {
        if (!winnerAlreadyAnnounced) {
            checkWinner(abalonGame.board)
                .then(player => {
                    if ([Players.White, Players.Black].includes(player)) {
                        enqueueSnackbar(`Player ${player} wins! You may continue playing if you want :-)`, {
                            variant: "success",
                        })
                        setWinnerAlreadyAnnounced(true)
                    }
                })
        }
    }, [abalonGame.turn, winnerAlreadyAnnounced])

    useEffect(() => {
        if (abalonGameState.isAITurn) {
            getMoveFromAI(abalonGame.turn, abalonGame.board, 60 * 1000)
                .then(newAbalonBoard => {
                    abalonGameDispatch(gameAICommitMove(newAbalonBoard))
                })
        }
    }, [abalonGameState.isAITurn])

    return (
        <div>
            <Stage width={400} height={400}>
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
                                        if (!abalonGameState.isAITurn) {
                                            handleTileClick(e, tileState)
                                        }
                                    }}
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
            {
                abalonGameState.isAITurn && (
                    <Box display="flex" flexDirection="row" justifyContent="center">
                        <Typography variant="h4" style={{ marginRight: 5 }}>
                            AI is thinking
                        </Typography>
                        <CircularProgress color="secondary" />
                    </Box>
                )
            }
        </div>
    )
}

BoardGame.propTypes = {

}

export default BoardGame
