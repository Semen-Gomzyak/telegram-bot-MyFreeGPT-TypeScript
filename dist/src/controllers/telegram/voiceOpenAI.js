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
const voiceMessageOpenAI = (bot, ctx, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const chatId = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.chat) === null || _a === void 0 ? void 0 : _a.id;
    const link = yield ctx.telegram.getFileLink(ctx.message.voice.file_id);
    const userId = String((_b = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _b === void 0 ? void 0 : _b.from.id);
    const oggPath = yield middlwares_1.default.ogg.create(link.href, userId);
    console.log("oggPath", oggPath);
    const mp3Path = yield middlwares_1.default.ogg.toMp3(oggPath, userId);
    console.log("mp3Path", mp3Path);
    const text = yield middlwares_1.default.openai.transcription(mp3Path);
    message.push({ role: middlwares_1.default.openai.roles.USER, content: text });
    const response = yield middlwares_1.default.openai.chat(message);
    message.push({
        role: middlwares_1.default.openai.roles.ASSISTANT,
        content: response.content,
    });
    yield bot.telegram.sendMessage(chatId, response.content);
});
exports.default = voiceMessageOpenAI;
//# sourceMappingURL=voiceOpenAI.js.map