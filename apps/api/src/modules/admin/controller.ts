import type { Socket, Server } from 'socket.io';

interface ServerStats {
    connectedUsers: string[];
    totalConnections: number;
}

class AdminController {
    private connectedUsers: string[] = [];

    constructor(private io: Server) {}

    private getStats(): ServerStats {
        return {
            connectedUsers: [...this.connectedUsers],
            totalConnections: this.connectedUsers.length,
        };
    }

    private broadcastStats(): void {
        this.io.emit('stats', this.getStats());
    }

    public addUser(socket: Socket): void {
        this.connectedUsers.push(socket.id);
        this.broadcastStats();
    }

    public removeUser(socket: Socket): void {
        const index = this.connectedUsers.indexOf(socket.id);
        if (index !== -1) {
            this.connectedUsers.splice(index, 1);
            this.broadcastStats();
        }
    }

    public setupListeners(socket: Socket): void {
        socket.on('/get-stats', () => {
            socket.emit('stats', this.getStats());
        });
    }
}

export default AdminController;
