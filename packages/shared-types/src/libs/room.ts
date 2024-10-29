export interface Room {
    id: string;
    name: string;
    creator: string;
    players: string[];
    type: 'normal' | 'extreme';
    state: 'waiting' | 'playing' | 'end';
    seed: string;
}
