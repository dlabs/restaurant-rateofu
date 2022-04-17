import express from 'express';
import dotenv from 'dotenv';

import connectToDB from './db/connect';

import { defaultErrorHandler } from './middleware/error-handling';

async function startServer(): Promise<void> {
    dotenv.config();

    const app = express();
    const port = process.env.APP_PORT || 3000;

    app.use(express.json());
    app.use(defaultErrorHandler);

    await connectToDB();

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
