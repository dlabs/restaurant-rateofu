import { ErrorRequestHandler } from 'express';

export async function defaultErrorHandler(
    err,
    req,
    res,
    next
): Promise<ErrorRequestHandler> {
    return res.status(500).send(err);
}
