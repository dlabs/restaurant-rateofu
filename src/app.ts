import express from 'express';
import cors from 'cors';
import bearerToken from 'express-bearer-token';
import { defaultErrorHandler } from './middleware/error-handling';

import connectToDB from './db/connect';

import menuItemsRouter from './routes/menu-items';
import orderItemRouter from './routes/order-items';
import ordersRouter from './routes/orders';
import loginRouter from './routes/login';

async function startServer(): Promise<void> {
    await connectToDB();

    // Create Express server
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(bearerToken());
    app.use(cors({ origin: '*' }));

    // Routers
    app.use('/api/login/', loginRouter);
    app.use('/api/menu-items/', menuItemsRouter);
    app.use('/api/order-items/', orderItemRouter);
    app.use('/api/orders/', ordersRouter);

    // Error handling must go at the end of declared middlewares
    app.use(defaultErrorHandler);

    const port = process.env.APP_PORT || 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

startServer();
