import { createServer } from './server';

import { setupDB } from './clients/db';

setupDB();

const port = process.env.API_PORT || 3001;
const server = createServer();

server.listen(port, () => {
    console.log(`API Server listening on port ${port}`);
    console.log(`For local development, visit http://localhost:${port}`);
});
