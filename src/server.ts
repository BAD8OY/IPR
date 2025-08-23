import express from 'express';
import * as http from "http";
import console from './utils/logger.js'
import {config} from './config/serverConfig.js';
import {orderRouter} from './routes/order.routes.js';
import {userRouter} from './routes/user.routes.js';
import {authRouter} from './routes/auth.routes.js';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import {getEmpById} from "./services/auth.service.js";

dotenv.config({path: '../.env'});

const router = express();
const swaggerSpec = swaggerJSDoc(config.swagger);

/** Start Server */
const StartServer = () => {
    router.use((req, res, next) => {
        res.on('finish', () => {
            console.info(`Incoming request - METHOD: [${req.method}] - URL: [${req.url}] - ${res.statusCode}`);
        });
        let ip_adress = (req.socket.remoteAddress);
        console.log(ip_adress);
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN, async (err, payload) => {
                if (err) next();
                else if (payload) {
                    req.user = await getEmpById(payload.id);
                    next();
                    if (!req.user) next();
                }
            });
        } else {
            next();
        }
    });

    router.use(express.urlencoded({extended: true}));
    router.use(express.json());

    /** Rules of API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/', orderRouter);
    router.use('/', userRouter);
    router.use('/', authRouter);
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        console.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => console.info(`Server is running on port ${config.server.port}`));
};

export {StartServer};
