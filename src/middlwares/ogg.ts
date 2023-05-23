import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import * as installer from '@ffmpeg-installer/ffmpeg';
import  {createWriteStream} from 'fs';
import { dirname, resolve } from 'path';
import removeFile from './utils';

const _dirname: string = dirname(require.main?.filename ?? '');

class OggConverter {
  constructor() {
    ffmpeg.setFfmpegPath(installer?.path ?? '');
  }

 toMp3(input: string, output: string): Promise<string> {
    try {
      const outputPath: string = resolve(dirname(input), `${output}.mp3`);
      return new Promise<string>((resolve, reject) => {
        ffmpeg(input)
          .inputOptions('-t 30')
          .output(outputPath)
          .on('end', () => {
            removeFile(input).then(() => resolve(outputPath));
          })
          .on('error', error => reject(error.message))
          .run();
      });
    } catch (error: any) {
      console.log('Error while creating mp3', error.message);
      throw error;
    }
  }

  async create(url: string, filename: string): Promise<string> {
    try {
      console.log(_dirname);
      const oggPath: string = resolve(_dirname, 'D:/GOIT NEW/telegram-bot-MyFreeGPT-TypeScript/src/tmp', `${filename}.ogg`);
      const response = await axios({
        method: 'get',
        url,
        responseType: 'stream',
      });
      return new Promise<string>(resolve => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on('finish', () => resolve(oggPath));
      });
    } catch (error: any) {
      console.log('Error while creating ogg', error.message);
      throw error;
    }
  }
}

ffmpeg.setFfmpegPath(installer.path);

const ogg = new OggConverter();
export default ogg;
