"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const installer = __importStar(require("@ffmpeg-installer/ffmpeg"));
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = __importDefault(require("./utils"));
const _dirname = (0, path_1.dirname)((_b = (_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : '');
class OggConverter {
    constructor() {
        var _a;
        fluent_ffmpeg_1.default.setFfmpegPath((_a = installer === null || installer === void 0 ? void 0 : installer.path) !== null && _a !== void 0 ? _a : '');
    }
    toMp3(input, output) {
        try {
            const outputPath = (0, path_1.resolve)((0, path_1.dirname)(input), `${output}.mp3`);
            return new Promise((resolve, reject) => {
                (0, fluent_ffmpeg_1.default)(input)
                    .inputOptions('-t 30')
                    .output(outputPath)
                    .on('end', () => {
                    (0, utils_1.default)(input).then(() => resolve(outputPath));
                })
                    .on('error', error => reject(error.message))
                    .run();
            });
        }
        catch (error) {
            console.log('Error while creating mp3', error.message);
            throw error;
        }
    }
    create(url, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(_dirname);
                const oggPath = (0, path_1.resolve)(_dirname, 'D:/GOIT NEW/telegram-bot-MyFreeGPT-TypeScript/src/tmp', `${filename}.ogg`);
                const response = yield (0, axios_1.default)({
                    method: 'get',
                    url,
                    responseType: 'stream',
                });
                return new Promise(resolve => {
                    const stream = (0, fs_1.createWriteStream)(oggPath);
                    response.data.pipe(stream);
                    stream.on('finish', () => resolve(oggPath));
                });
            }
            catch (error) {
                console.log('Error while creating ogg', error.message);
                throw error;
            }
        });
    }
}
fluent_ffmpeg_1.default.setFfmpegPath(installer.path);
const ogg = new OggConverter();
exports.default = ogg;
//# sourceMappingURL=ogg.js.map