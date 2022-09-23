import { Request, Response } from 'express';

import * as userService from '../services/userService';
import * as refreshTokenService from '../services/refreshTokenService';

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
    const { refreshToken: oldRefreshToken } = req.body;

    const { accessToken, refreshToken } = await refreshTokenService.refreshSession(oldRefreshToken);

    res.status(200).send({ accessToken, refreshToken });
}

export async function logout(req: Request, res: Response) {
    const { refreshToken } = req.body;

    await refreshTokenService.finishSession(refreshToken);

    res.status(204).send();
}
