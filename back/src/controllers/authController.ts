import { Request, Response } from 'express';

import * as userService from '../services/userService';
import * as refreshTokenService from '../services/refreshTokenService';
import { CustomError } from '../middlewares/errorHandlerMiddleware';

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    await userService.createUser(email, password);

    res.status(201).send();
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await userService.createSession(email, password);

    res.status(200).send({ accessToken, refreshToken });
}

export async function refresh(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization?.startsWith('Bearer ')) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    const oldRefreshToken = authorization.replace('Bearer ', '');
    if (!oldRefreshToken) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    const { accessToken, refreshToken } = await refreshTokenService.refreshSession(oldRefreshToken);

    res.status(200).send({ accessToken, refreshToken });
}

export async function logout(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization?.startsWith('Bearer ')) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    const oldRefreshToken = authorization.replace('Bearer ', '');
    if (!oldRefreshToken) {
        throw CustomError('error_unauthorized', 'Invalid request header');
    }

    await refreshTokenService.finishSession(oldRefreshToken);

    res.status(204).send();
}
