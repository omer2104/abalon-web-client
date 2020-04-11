import { TileContent } from "./AbalonGameConstants"


class AbalonBoardTile {
    /**
     * 
     * @param {String} content 
     */
    constructor(content) {
        this.content = content
    }

    isBlackSoldier() {
        return (
            [
                TileContent.BlackSoldier,
                TileContent.BlackSoldierMarkedAction,
                TileContent.BlackSoldierMarkedSelection,
            ].includes(this.content)
        )
    }

    isWhiteSoldier() {
        return (
            [
                TileContent.WhiteSoldier,
                TileContent.WhiteSoldierMarkedAction,
                TileContent.WhiteSoldierMarkedSelection,
            ].includes(this.content)
        )
    }
}


export {
    AbalonBoardTile
}