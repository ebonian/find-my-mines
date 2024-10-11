import http from 'http';

import { createServer } from './server';
import { createSocket } from './socket';
import { setupDB } from './clients/db';

setupDB();

const port = process.env.API_PORT || 3001;
const server = createServer();
const httpServer = http.createServer(server);

createSocket(httpServer);

httpServer.listen(port, () => {
    console.log(`API Server listening on port ${port}`);
    console.log(`For local development, visit http://localhost:${port}`);
});
