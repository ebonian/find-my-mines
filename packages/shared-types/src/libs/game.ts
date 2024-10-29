export interface Game {
    id: string;
    roomId: string;
    firstPlayer: string;
    actions: Action[];
}

export interface Action {
    id: number; // auto increment
    userId: string;
    cellId: number | null;
    bombFound: boolean;
}
