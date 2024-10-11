type cellStatus = 'hidden' | 'revealed' | 'flagged';

export interface cell {
    hasMine: boolean;
    adjacentMines: number;
    status: cellStatus;
}

export function createCell(hasMine: boolean): cell {
    return {
        hasMine: hasMine, // Initialize the cell with or without a mine
        adjacentMines: 0, // Start with 0 adjacent mines
        status: 'hidden', // Cells start as hidden
    };
}
