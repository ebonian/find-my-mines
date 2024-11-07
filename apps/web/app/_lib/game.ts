import { Action, Game } from '@repo/shared-types';

export interface Cell {
    hasMine: boolean;
    status: 'hidden' | 'revealed' | 'flagged';
}

export const createBoard = (
    size: number,
    mines: number,
    coordinates: { x: number; y: number }[]
): Cell[][] => {
    let board: Cell[][] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => ({
            hasMine: false,
            adjacentMines: 0,
            status: 'hidden',
        }))
    );

    for (let i = 0; i < mines; i++) {
        const row = coordinates[i]!['y'];
        const col = coordinates[i]!['x'];
        board[row]![col]!.hasMine = true;
    }

    return board;
};

export const applyActions = (board: Cell[][], actions: Action[]) => {
    for (const action of actions) {
        if (!action.cellId || action.cellId === '') {
            continue;
        }

        const [rowIndexStr, colIndexStr] = action.cellId.split('-');
        const rowIndex = Number(rowIndexStr);
        const colIndex = Number(colIndexStr);

        board[rowIndex]![colIndex]!.status = 'revealed';
    }

    return board;
};

export const setGameTurnHandler = (
    game: Game,
    userId: string
): null | 'user' | 'opponent' => {
    if (game.actions.length === 0) {
        if (game.firstPlayerId === null) {
            return null;
        } else if (game.firstPlayerId === userId) {
            return 'user';
        } else {
            return 'opponent';
        }
    } else {
        const lastAction = game.actions[game.actions.length - 1];
        if (!lastAction) {
            return null;
        }

        if (lastAction.userId === userId) {
            return 'opponent';
        } else {
            return 'user';
        }
    }
};
