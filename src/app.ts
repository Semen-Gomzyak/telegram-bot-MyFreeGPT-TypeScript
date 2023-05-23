import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import bot from './routes/telegramRoutes';
import websiteRoutes from './routes/websiteRoutes';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', websiteRoutes)

process.once('SIGINT', () => bot.stop('SIGIT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();

app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" })
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).json({ message: err.message });
});

export default app;