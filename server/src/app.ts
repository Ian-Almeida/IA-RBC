import { ServerConfig } from './config';
import database from './database';
const server = new ServerConfig();

// Init DB
( async () => {
    await database.db.initialize();
    // await database.db.synchronize()
})();

server.start();  
