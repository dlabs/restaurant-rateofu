import dotenv from 'dotenv';
dotenv.config();

export default {
    dbConnString: process.env.DB_CONN_STRING,
    dbUsername: process.env.ME_CONFIG_MONGODB_USERNAME,
    dbPassword: process.env.ME_CONFIG_MONGODB_PASSWORD,
};
