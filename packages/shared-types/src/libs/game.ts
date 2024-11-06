export interface Game {
    _id: string;
    roomId: string;
    firstPlayerId: string | null;
    actions: Action[];
}

export interface Action {
    id: number; // auto increment
    userId: string;
    cellId: string | null;
    bombFound: boolean;
}
