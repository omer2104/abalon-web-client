import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, makeStyles, Typography, Divider, Button, Dialog, DialogTitle } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants';
import { instructionsURL, instructions2URL } from '../../assets';

const useStyles = makeStyles(theme => ({
    boxTitle: {
        color: "#E4A148",
        fontFamily: "Luminari, fantasy",
    },
    boxSubHeader: {
        color: '#BCD39C',
        fontSize: 20,
        fontFamily: "Luminari, fantasy",
    },
    boxContent: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#E4A148',
        borderStyle: 'double',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
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

const StartPage = props => {
    const [isInstructionsDialogOpen, setIsInstructionsDialogOpen] = useState(false)
    const classes = useStyles()

    return (
        <>
            <Dialog 
                fullScreen 
                onClose={() => setIsInstructionsDialogOpen(false)} 
                aria-labelledby="simple-dialog-title" 
                open={isInstructionsDialogOpen}
            >
                <Button 
                    onClick={() => setIsInstructionsDialogOpen(false)}
                    className={classes.boxButton}
                >
                    Back
                </Button>
                <img src={instructionsURL} />
                <img src={instructions2URL} />
            </Dialog>
            <Box display="flex" alignItems="center" justifyContent="center"
                className={classes.containerBox}
            >
                <Box className={classes.boxContent}>
                    <Typography variant="h3" className={classes.boxTitle}>
                        Abalon Game
                    </Typography>
                    <Divider style={{marginBottom: 20}} />
                    <Typography variant="caption" className={classes.boxSubHeader}>
                        Good luck beating this AI
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Button
                            className={classes.boxButton}
                            onClick={e => {
                                document.getElementById("gotoGameBtn").click()
                            }}
                        >
                            Let's Play
                        </Button>
                        <Link id="gotoGameBtn" to={AppRoutes.abalonGamePage} />
                        <Button
                            className={classes.boxButton}
                            onClick={e => {
                                setIsInstructionsDialogOpen(true)
                            }}
                        >
                            Game Rules
                        </Button>
                    </Box>
                </Box>
            </Box>        
        </>
    )
}

StartPage.propTypes = {

}

export default StartPage
