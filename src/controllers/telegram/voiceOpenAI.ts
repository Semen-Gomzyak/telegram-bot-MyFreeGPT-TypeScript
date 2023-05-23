import middlwares from "../../middlwares";
import TelegrafContext from "telegraf/typings/context";

const voiceMessageOpenAI = async (bot: any, ctx: TelegrafContext, message: any[]): Promise<void> => {
    const chatId = ctx?.chat?.id;

  const link = await ctx.telegram.getFileLink((ctx.message as any).voice.file_id);
  const userId = String(ctx?.message?.from.id);
  const oggPath = await middlwares.ogg.create(link.href, userId);
  console.log("oggPath", oggPath)
  const mp3Path = await middlwares.ogg.toMp3(oggPath, userId);
  console.log("mp3Path", mp3Path)

    const text = await middlwares.openai.transcription(mp3Path);

    message.push({ role: middlwares.openai.roles.USER, content: text });
    const response = await middlwares.openai.chat(message);

    message.push({
      role: middlwares.openai.roles.ASSISTANT,
      content: response!.content!,
    });
    await bot.telegram.sendMessage(chatId, response!.content!);
}

export default voiceMessageOpenAI;