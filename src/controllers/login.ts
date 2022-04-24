import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

interface ILoginRequest {
    username: string;
    role: 'chef' | 'barman' | 'waiter';
}

/**
 * Barebones login controller. Receives a staff member's username
 * and position (cook, barkeep, waiter) and returns a hash for
 * other endpoints to use as a bearer token.
 *
 * Due to its simplicity, the controller handles the request fully
 * instead of passing to services.
 * @param req
 * @param res
 */
export async function loginController(req, res): Promise<RequestHandler> {
    const { username, role } = req.body as ILoginRequest;

    if (!username || !role) {
        res.status(400).send({
            error: 'Please pick both a username and role',
        });
    }

    return res.status(200).send({
        bearerToken: await bcrypt.hash(Date.now().toString(), 8),
    });
}
