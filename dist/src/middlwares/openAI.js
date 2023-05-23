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
const openai_1 = require("openai");
const dotenv_1 = __importDefault(require("dotenv"));
const { createReadStream } = require('fs');
dotenv_1.default.config();
const OPENAI_KEY = process.env.OPENAI_KEY || '';
class OpenAI {
    constructor(apiKey) {
        this.roles = {
            ASSISTANT: 'assistant',
            USER: 'user',
            SYSTEM: 'system',
        };
        const configuration = new openai_1.Configuration({
            apiKey,
        });
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    chat(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                    messages,
                });
                return response.data.choices[0].message;
            }
            catch (error) {
                return console.error('Error while gpt chat', error.message);
            }
        });
    }
    transcription(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.openai.createTranscription(createReadStream(filepath), 'whisper-1');
                return response.data.text;
            }
            catch (error) {
                return console.error('Error while transcription', error.message);
            }
        });
    }
}
const openai = new OpenAI(OPENAI_KEY);
exports.default = openai;
//# sourceMappingURL=openAI.js.map