import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getEmpById } from '../services/auth.service.js';
import console from "../utils/logger.js";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        console.info(`Incoming request - METHOD: [${req.method}] - URL: [${req.url}] - ${res.statusCode}`);
    });
    const ip_adress = (req.socket.remoteAddress);
    console.log(ip_adress);
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.TOKEN,
            async (err, payload: any) => {
                if (err) return next();
                if (payload) {
                    req.user = await getEmpById(payload.id);
                    if (!req.user) return next();
                }
                next();
            }
        );
    } else {
        next();
    }
};
