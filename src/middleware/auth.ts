import { Request, NextFunction } from 'express';

/**
 * Very basic authentication middleware. Checks for existence of a token
 * on the request object (assumes previous usage of express-bearer-token)
 * and returns 403 Unauthorized if there is no token.
 * @param req
 * @param res
 * @param next
 */
export async function checkToken(
    req: Request & { token: string },
    res,
    next: NextFunction
): Promise<void> {
    if (!req.token) {
        return res.status(403).send({
            error: 'No authorization token',
        });
    }
    next();
}
