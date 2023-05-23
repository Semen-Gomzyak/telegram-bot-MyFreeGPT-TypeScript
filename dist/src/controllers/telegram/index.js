"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const startWorkingWithBot_1 = __importDefault(require("./startWorkingWithBot"));
const messageOpenAI_1 = __importDefault(require("./messageOpenAI"));
const voiceOpenAI_1 = __importDefault(require("./voiceOpenAI"));
const telegramController = {
    startWorkingWithBot: startWorkingWithBot_1.default,
    messageOpenAI: messageOpenAI_1.default,
    voiceMessageOpenAI: voiceOpenAI_1.default
};
exports.default = telegramController;
//# sourceMappingURL=index.js.map