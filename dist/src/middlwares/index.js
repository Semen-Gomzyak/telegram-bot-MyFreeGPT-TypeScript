"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tryCatchWrapper_1 = __importDefault(require("./tryCatchWrapper"));
const ogg_1 = __importDefault(require("./ogg"));
const openAI_1 = __importDefault(require("./openAI"));
const HttpError_1 = __importDefault(require("./HttpError"));
const validateBody_1 = __importDefault(require("./validateBody"));
const removePngOrJpgFromString_1 = __importDefault(require("./removePngOrJpgFromString"));
const uploadImage_1 = require("./uploadImage");
const updateCloudinaryAvatar_1 = __importDefault(require("./updateCloudinaryAvatar"));
const middlwares = {
    tryCatchWrapper: tryCatchWrapper_1.default,
    ogg: ogg_1.default,
    openai: openAI_1.default,
    HttpError: HttpError_1.default,
    validateBody: validateBody_1.default,
    removePngOrJpgFromString: removePngOrJpgFromString_1.default,
    upload: uploadImage_1.upload,
    avatarResize: uploadImage_1.avatarResize,
    updateCloudinaryImage: updateCloudinaryAvatar_1.default
};
exports.default = middlwares;
//# sourceMappingURL=index.js.map