import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function createChatCompletion(prompt: string) {
  try {
    const messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content:
          "You are an assistant that generates prompts for the image generation ai service DALL.E 2, you ingest lyrics from songs and output a prompt to generate art. You can utilize any information you know about the artist or genre as well and you can be creative to generate the best prompts. Your response will be fed directly into DALL.E 2 and the response must be less than 400 characters long.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];
    return await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateImage(prompt: string) {
  try {
    const trimmedPrompt = prompt.substring(0, 390);

    const response = await openai.createImage({
      prompt: trimmedPrompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
