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
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const _1 = __importDefault(require("."));
dotenv_1.default.config();
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
cloudinary_1.v2.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});
const updateCloudinaryImage = (req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    try {
        if (!req.file) {
            throw new Error('No file provided');
        }
        const { path: tmpUpload, originalname } = req.file;
        yield _1.default.avatarResize(originalname);
        const imageName = `${name}_${originalname}`;
        const cloudinaryUpload = yield cloudinary_1.v2.uploader.upload(tmpUpload, {
            public_id: _1.default.removePngOrJpgFromString(imageName),
        });
        const imageURL = cloudinaryUpload.secure_url;
        return imageURL;
    }
    catch (error) {
        return '';
    }
});
exports.default = updateCloudinaryImage;
//# sourceMappingURL=updateCloudinaryAvatar.js.map