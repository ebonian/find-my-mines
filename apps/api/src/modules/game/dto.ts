import { Action } from '@repo/shared-types';

export interface GameDto {
    roomId: string;
    firstPlayerId: string | null;
    actions: Action[];
}
