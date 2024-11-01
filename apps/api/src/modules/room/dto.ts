export interface RoomDto {
    name: string;
    creator: string;
    players: string[];
    type: 'normal' | 'extreme';
    state: 'waiting' | 'playing' | 'end';
    seed: string;
}
