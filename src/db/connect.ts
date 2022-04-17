import mongoose from 'mongoose';
import envs from '../config/envs';
import { ensureMenuExists } from './seed';

export default async function connectToDB(): Promise<void> {
    try {
        await mongoose.connect(envs.dbConnString, {
            user: envs.dbUsername,
            pass: envs.dbPassword,
            authSource: 'admin',
        });
        console.log('Connection to DB successful');
    } catch (e) {
        console.log(e);
    }

    await ensureMenuExists();
}
