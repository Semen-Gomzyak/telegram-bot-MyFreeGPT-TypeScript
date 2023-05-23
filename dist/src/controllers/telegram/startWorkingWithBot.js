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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BACK_END } = process.env;
const InfoMessage = `Hello, this is a bot that has the following functionality: 
1) You can chat with the GPT chat, for this you just need to send a message in text format to the chat.
2) You can send your question to the GPT chat by voice, to do this, send a voice message to the chat through the microphone function in the telegram.
3) You can see the current exchange rate for the hryvnia, according to the official rate of Privatbank. To do this, you should visit the site.
4) You can see the weather forecast. To do this, you should visit the site.
5) You can see the list of goods that are currently in stock. To do this, you should visit the site.
6) You can create and manage the tasks that you need to do, only you will see your tasks, you will not be able to see other task users.`;
const sendInfoMessage = (bot, ctx, webAppUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
    const keyboard = {
        reply_markup: {
            keyboard: [
                ['Info', { text: 'Open site', web_app: { url: webAppUrl } }],
                ['Donate'],
            ],
            resize_keyboard: true,
        },
    };
    yield bot.telegram.sendMessage(chatId, InfoMessage, keyboard);
});
const startWorkingWithBot = (bot, ctx, webAppUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    const userData = {
        token: ctx.telegram.token,
        username: (_b = ctx.from) === null || _b === void 0 ? void 0 : _b.username,
        first_name: (_c = ctx.from) === null || _c === void 0 ? void 0 : _c.first_name,
        language_code: (_d = ctx.from) === null || _d === void 0 ? void 0 : _d.language_code,
        id_chat: (_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id,
    };
    try {
        yield axios_1.default.post(`${BACK_END}/api/register`, userData);
        yield sendInfoMessage(bot, ctx, webAppUrl);
    }
    catch (error) {
        ((_f = error.response) === null || _f === void 0 ? void 0 : _f.status) === 409
            ? yield sendInfoMessage(bot, ctx, webAppUrl)
            : console.error(error);
    }
});
exports.default = startWorkingWithBot;
//# sourceMappingURL=startWorkingWithBot.js.map