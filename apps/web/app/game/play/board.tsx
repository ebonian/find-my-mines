import React, { useState } from 'react';
import { cell, createCell } from './cell'; // Assuming cell and createCell are imported

const boardSize = 9;
const numOfMines = 11;

// Utility function to generate the board
const createBoard = (size: number, mines: number): cell[][] => {
    // Initialize an empty board
    let board: cell[][] = Array(size)
        .fill(null)
        .map(
            () =>
                Array(size)
                    .fill(null)
                    .map(() => createCell(false)) // Use createCell from your cell.ts file
        );

    // Add mines randomly
    let placedMines = 0;
    while (placedMines < mines) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (board[row][col].hasMine) {
            board[row][col].hasMine = true;
            placedMines++;
        }
    }

    // Calculate adjacent mines for each cell
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (!board[row][col].hasMine) {
                board[row][col].adjacentMines = countAdjacentMines(
                    board,
                    row,
                    col,
                    size
                );
            }
        }
    }

    return board;
};

// Function to count mines around a given cell
const countAdjacentMines = (
    board: cell[][],
    row: number,
    col: number,
    size: number
): number => {
    let mineCount = 0;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                if (board[newRow][newCol].hasMine) {
                    mineCount++;
                }
            }
        }
    }
    return mineCount;
};

export default createBoard;
