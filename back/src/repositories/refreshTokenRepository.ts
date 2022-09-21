import { RefreshToken } from '@prisma/client';
import client from '../config/prisma';

export type IRefreshTokenData = Omit<RefreshToken, 'id'>;

export async function findByRefreshToken(refreshToken: string) {
    const result = await client.refreshToken.findUnique({
        where: { refreshToken },
    });

    return result;
}

export async function insertRefreshToken(refreshTokenData: IRefreshTokenData) {
    const { userId, refreshToken } = refreshTokenData;

    await client.refreshToken.create({
        data: { userId, refreshToken },
    });
}

export async function updateRefreshToken(id: string, refreshToken: string) {
    await client.refreshToken.update({
        where: { id },
        data: { refreshToken },
    });
}

export async function deleteRefreshToken(id: string) {
    await client.refreshToken.delete({
        where: { id },
    });
}

export async function deleteRefreshTokens(userId: string) {
    await client.refreshToken.deleteMany({
        where: { userId },
    });
}
