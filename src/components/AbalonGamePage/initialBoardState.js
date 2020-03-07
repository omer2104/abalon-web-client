import { TileContent, AbalonBoardTile } from "../../modules/abalon-game"

const initialTiles = [
    // row 0
    {row: 0, column: 0, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 0, column: 1, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 0, column: 2, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 0, column: 3, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 0, column: 4, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},

    // row 1
    {row: 1, column: 0, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 1, column: 1, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 1, column: 2, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 1, column: 3, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 1, column: 4, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 1, column: 5, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},

    // row 2
    {row: 2, column: 0, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 1, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 2, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 3, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 4, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 5, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    {row: 2, column: 6, tile: new AbalonBoardTile(TileContent.WhiteSoldier)},
    
    // row 3
    {row: 3, column: 0, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 1, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 2, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 3, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 4, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 5, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 6, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 3, column: 7, tile: new AbalonBoardTile(TileContent.Empty)},

    // row 4
    {row: 4, column: 0, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 1, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 2, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 3, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 4, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 5, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 6, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 7, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 4, column: 8, tile: new AbalonBoardTile(TileContent.Empty)},

    // row 5
    {row: 5, column: 0, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 1, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 2, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 3, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 4, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 5, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 6, tile: new AbalonBoardTile(TileContent.Empty)},
    {row: 5, column: 7, tile: new AbalonBoardTile(TileContent.Empty)},

    // row 6
    {row: 6, column: 0, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 1, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 2, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 3, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 4, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 5, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 6, column: 6, tile: new AbalonBoardTile(TileContent.BlackSoldier)},

    // row 7
    {row: 7, column: 0, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 7, column: 1, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 7, column: 2, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 7, column: 3, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 7, column: 4, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 7, column: 5, tile: new AbalonBoardTile(TileContent.BlackSoldier)},

    // row 8
    {row: 8, column: 0, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 8, column: 1, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 8, column: 2, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 8, column: 3, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
    {row: 8, column: 4, tile: new AbalonBoardTile(TileContent.BlackSoldier)},
]

export {
    initialTiles
}