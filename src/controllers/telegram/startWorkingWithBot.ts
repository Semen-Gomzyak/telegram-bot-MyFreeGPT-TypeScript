import axios from 'axios';
import dotenv from 'dotenv';
import TelegrafContext from "telegraf/typings/context";

dotenv.config();

const { BACK_END } = process.env;

const InfoMessage = `Hello, this is a bot that has the following functionality: 
1) You can chat with the GPT chat, for this you just need to send a message in text format to the chat.
2) You can send your question to the GPT chat by voice, to do this, send a voice message to the chat through the microphone function in the telegram.
3) You can see the current exchange rate for the hryvnia, according to the official rate of Privatbank. To do this, you should visit the site.
4) You can see the weather forecast. To do this, you should visit the site.
5) You can see the list of goods that are currently in stock. To do this, you should visit the site.
6) You can create and manage the tasks that you need to do, only you will see your tasks, you will not be able to see other task users.`;


const sendInfoMessage = async (bot: any, ctx: TelegrafContext, webAppUrl: string): Promise<void> => {
    const chatId = ctx?.chat?.id;

    const keyboard = {
        reply_markup: {
            keyboard: [
                ['Info', { text: 'Open site', web_app: { url: webAppUrl } }],
                ['Donate'],
            ],
            resize_keyboard: true,
        },
    };

    await bot.telegram.sendMessage(chatId, InfoMessage, keyboard);
};

const startWorkingWithBot = async (bot: any, ctx: TelegrafContext, webAppUrl: string): Promise<void> => {
    const userData = {
        token: ctx.telegram.token,
        username: ctx.from?.username,
        first_name: ctx.from?.first_name,
        language_code: ctx.from?.language_code,
        id_chat: ctx.from?.id,
    };

    try {
        await axios.post(`${BACK_END}/api/register`, userData);
        await sendInfoMessage(bot, ctx, webAppUrl);
    } catch (error: any) {
        error.response?.status === 409
            ? await sendInfoMessage(bot, ctx, webAppUrl)
            : console.error(error);
    }
}

export default startWorkingWithBot;