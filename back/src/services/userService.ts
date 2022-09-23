import jwt from 'jsonwebtoken';

import * as userRepository from '../repositories/userRepository';
import { CustomError } from '../middlewares/errorHandlerMiddleware';
import * as refreshTokenService from './refreshTokenService';

import { hashPassword, validatePassword } from '../utils/encryptUtil';

export async function getById(id: string) {
    const user = await userRepository.findById(id);

    return user;
}

export async function createUser(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (user) {
        throw CustomError('error_conflict', 'An account is already linked to this email');
    }

    const hashedPassword = await hashPassword(password);

    await userRepository.insert({ email, password: hashedPassword });
}

export async function createSession(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw CustomError('error_unauthorized', 'Cannot create session');
    }

    if (!validatePassword(password, user.password)) {
        throw CustomError('error_unauthorized', 'Cannot create session');
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30min' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '1d' });

    await refreshTokenService.createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
}
