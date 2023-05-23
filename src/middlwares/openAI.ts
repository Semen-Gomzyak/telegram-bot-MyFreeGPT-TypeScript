import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai';
import dotenv from 'dotenv';
const { createReadStream } = require('fs');
dotenv.config();

const OPENAI_KEY: string = process.env.OPENAI_KEY || '';

class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
    };
    
    private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async chat(messages: CreateChatCompletionRequest['messages']) {
    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      });

      return response.data.choices[0].message;
    } catch (error: any) {
     return console.error('Error while gpt chat', error.message);
    }
  }

  async transcription(filepath: string) {
    try {
      const response = await this.openai.createTranscription(
        createReadStream(filepath),
        'whisper-1'
      );

      return response.data.text;
    } catch (error: any) {
     return console.error('Error while transcription', error.message);
    }
  }
}

const openai = new OpenAI(OPENAI_KEY);
export default openai; 










