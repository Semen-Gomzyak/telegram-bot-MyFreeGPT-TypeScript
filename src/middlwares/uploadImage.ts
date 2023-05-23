import multer from 'multer';
import Jimp from 'jimp';
import path from 'path';

const tmpDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, tmpDir);
    },
    filename: function (_req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 256112,
    },
});

const avatarResize = async (filename: string) => {
    const avatar = Jimp.read(`${tmpDir}/${filename}`);
    (await avatar).resize(250, 250);

    return avatar;
};

export {
    upload,
    avatarResize
}