import React from 'react'
import PropTypes from 'prop-types'
import { blackBallURL } from "../../assets";
import { Stage, Layer, Image } from 'react-konva'
import useImage from "use-image";
import { AbalonBoard } from '../../modules/abalon-game';

const BoardGame = props => {
    const [blackBallImage] = useImage(blackBallURL)

    const boardState = new AbalonBoard().getBoardState()

    return (
        <Stage width={500} height={500} style={{border: 'solid', borderWidth: 5, borderColor: 'black'}}>
            <Layer>
                {boardState.map(x => (
                    <Image 
                        key={`${x.row} ${x.column}`}
                        image={blackBallImage} 
                        width={25} 
                        height={25} 
                        x={x.column * 25}
                        y={x.row * 25}
                    />
                ))}
            </Layer>
        </Stage>
    )
}

BoardGame.propTypes = {

}

export default BoardGame
