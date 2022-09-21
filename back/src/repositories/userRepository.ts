import { User } from '@prisma/client';
import client from '../config/prisma';

export type IUserData = Omit<User, 'id' | 'createdAt'>;
export type IUserInsertData = Omit<IUserData, 'refreshToken'>;
export type IUserUpdateData = Partial<IUserData>;

export async function findById(id: string) {
    const result = await client.user.findUnique({
        where: { id },
    });

    return result;
}

export async function findByEmail(email: string) {
    const result = await client.user.findUnique({
        where: { email },
    });

    return result;
}

export async function insert(userData: IUserInsertData) {
    const { email, password } = userData;

    await client.user.create({
        data: { email, password },
    });
}
