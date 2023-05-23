"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlwares_1 = __importDefault(require("../../middlwares"));
const infoMessage = `Hello, this is a bot that has the following functionality: 
1) You can chat with the GPT chat, for this you just need to send a message in text format to the chat.
2) You can send your question to the GPT chat by voice, to do this, send a voice message to the chat through the microphone function in the telegram.
3) You can see the current exchange rate for the hryvnia, according to the official rate of Privatbank. To do this, you should visit the site.
4) You can see the weather forecast. To do this, you should visit the site.
5) You can see the list of goods that are currently in stock. To do this, you should visit the site.
6) You can create and manage the tasks that you need to do, only you will see your tasks, you will not be able to see other task users.`;
const messageOpenAI = (bot, ctx, message, webAppUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
    const messageText = ctx.message.text;
    if (messageText === 'Info') {
        return bot.telegram.sendMessage(chatId, infoMessage);
    }
    if (messageText === 'Donate') {
        const keyboard = {
            reply_markup: {
                keyboard: [
                    [
                        { text: '400UAH', web_app: { url: `https://prt.mn/0F6Ui4tXuQ` } },
                        { text: '800UAH', web_app: { url: `https://prt.mn/DKp-WOtD71` } },
                    ],
                    [
                        { text: '1200UAH', web_app: { url: `https://prt.mn/HQFBOfEhD` } },
                        { text: '1600UAH', web_app: { url: `https://prt.mn/hXzF0JZiN` } },
                    ],
                    [
                        {
                            text: '8000UAH',
                            web_app: { url: `https://prt.mn/NnoHlFdl5a` },
                        },
                        {
                            text: '20000UAH',
                            web_app: { url: `https://prt.mn/Q30681JsKG` },
                        },
                    ],
                    ['Main Menu'],
                ],
                resize_keyboard: true,
            },
        };
        return bot.telegram.sendMessage(chatId, 'Select a menu item:', keyboard);
    }
    if (messageText === 'Main Menu') {
        const keyboard = {
            reply_markup: {
                keyboard: [
                    ['Info', { text: 'Open site', web_app: { url: webAppUrl } }],
                    ['Donate'],
                ],
                resize_keyboard: true,
            },
        };
        return bot.telegram.sendMessage(chatId, 'Select a menu item or send message or voice if you want to ask chat GPT', keyboard);
    }
    message.push({
        role: middlwares_1.default.openai.roles.USER,
        content: messageText,
    });
    const response = yield middlwares_1.default.openai.chat(message);
    message.push({
        role: middlwares_1.default.openai.roles.ASSISTANT,
        content: response.content,
    });
    yield bot.telegram.sendMessage(chatId, response.content);
});
exports.default = messageOpenAI;
//# sourceMappingURL=messageOpenAI.js.map