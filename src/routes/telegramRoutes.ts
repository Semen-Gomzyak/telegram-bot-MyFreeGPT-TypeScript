import { Telegraf, session } from 'telegraf';
import dotenv from 'dotenv';
import controllers from '../controllers';
dotenv.config();

const TELEGRAM_TOKEN: string = process.env.TELEGRAM_TOKEN || '';

const webAppUrl = 'https://tg-online-shop-fronend.vercel.app/';

const message: any = [];

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.use(session());

bot.command('start', async (ctx) => {
controllers.telegramController.startWorkingWithBot(bot, ctx, webAppUrl);
});

bot.on('text', async (ctx) => {
controllers.telegramController.messageOpenAI(bot, ctx, message, webAppUrl);
});

bot.on('voice', async (ctx) => {
controllers.telegramController.voiceMessageOpenAI(bot, ctx, message);
});

export default bot;