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
exports.avatarResize = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const tmpDir = path_1.default.join(__dirname, '../', 'tmp');
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, tmpDir);
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 256112,
    },
});
exports.upload = upload;
const avatarResize = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const avatar = jimp_1.default.read(`${tmpDir}/${filename}`);
    (yield avatar).resize(250, 250);
    return avatar;
});
exports.avatarResize = avatarResize;
//# sourceMappingURL=uploadImage.js.map