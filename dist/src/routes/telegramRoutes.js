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
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const controllers_1 = __importDefault(require("../controllers"));
dotenv_1.default.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';
const webAppUrl = 'https://tg-online-shop-fronend.vercel.app/';
const message = [];
const bot = new telegraf_1.Telegraf(TELEGRAM_TOKEN);
bot.use((0, telegraf_1.session)());
bot.command('start', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    controllers_1.default.telegramController.startWorkingWithBot(bot, ctx, webAppUrl);
}));
bot.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    controllers_1.default.telegramController.messageOpenAI(bot, ctx, message, webAppUrl);
}));
bot.on('voice', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    controllers_1.default.telegramController.voiceMessageOpenAI(bot, ctx, message);
}));
exports.default = bot;
//# sourceMappingURL=telegramRoutes.js.map