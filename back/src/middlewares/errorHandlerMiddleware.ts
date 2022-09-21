import { Request, Response, NextFunction } from 'express';

const ERRORS = {
    error_bad_request: 400,
    error_unauthorized: 401,
    error_forbidden: 403,
    error_not_found: 404,
    error_conflict: 409,
    error_unprocessable_entity: 422,
    error_internal_server_error: 500,
};

type ErrorType = keyof typeof ERRORS;

interface ICustomError extends Error {
    type: ErrorType;
    customMessage: string | string[];
}

export function CustomError(type: ErrorType, customMessage: string | string[]) {
    return { type, customMessage };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: ICustomError, _req: Request, res: Response, _next: NextFunction) {
    const { type, customMessage } = err;
    const errorType = ERRORS[type];

    if (errorType) {
        const code = ERRORS[type];

        return res.status(code).send(customMessage);
    }

    return res.status(500).send(err.message);
}
