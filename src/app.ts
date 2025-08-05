import {StartServer} from './server.js';
import {connectToMongo} from "./config/mongoose.js";
import {connectToPostgres} from "./config/sequelize.js";
connectToPostgres();
connectToMongo();
StartServer();
