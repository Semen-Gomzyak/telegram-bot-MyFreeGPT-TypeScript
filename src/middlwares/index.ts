import tryCatchWrapper from "./tryCatchWrapper";
import ogg from "./ogg";
import openai from './openAI';
import HttpError from "./HttpError";
import validateBody from "./validateBody";
import removePngOrJpgFromString from "./removePngOrJpgFromString";
import { upload, avatarResize } from "./uploadImage";
import updateCloudinaryImage from "./updateCloudinaryAvatar";

const middlwares = {
    tryCatchWrapper,
    ogg,
    openai,
    HttpError,
    validateBody,
    removePngOrJpgFromString,
    upload,
    avatarResize,
    updateCloudinaryImage
}

export default middlwares;