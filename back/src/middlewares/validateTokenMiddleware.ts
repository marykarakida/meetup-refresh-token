import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';
import { CustomError } from './errorHandlerMiddleware';

export interface IToken {
    id: string;
}

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization?.startsWith('Bearer ')) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    const token = authorization.replace('Bearer ', '');
    if (!token) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        const user = await userService.getById((payload as IToken).id);

        if (!user) {
            throw CustomError('error_unauthorized', 'Invalid token');
        }

        res.locals.userId = user.id;

        next();
    } catch (err) {
        throw CustomError('error_unauthorized', 'Invalid token');
    }
}
