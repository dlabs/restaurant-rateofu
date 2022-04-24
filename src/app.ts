import express from 'express';
import cors from 'cors';

import connectToDB from './db/connect';

import menuItemsRouter from './routes/menu-items';
import { defaultErrorHandler } from './middleware/error-handling';

async function startServer(): Promise<void> {
    await connectToDB();

    // Create Express server
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(cors({ origin: '*' }));

    // Routers
    app.use('/api/menu-items', menuItemsRouter);

    // Error handling must go at the end of declared middlewares
    app.use(defaultErrorHandler);

    const port = process.env.APP_PORT || 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
