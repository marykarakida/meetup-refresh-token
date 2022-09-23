import { Request, Response } from 'express';

import * as userService from '../services/userService';

export async function getUserById(req: Request, res: Response) {
    const userId = res.locals.userId;

    const user = await userService.getById(userId);

    res.status(200).send(user);
}
