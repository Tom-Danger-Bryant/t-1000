
import { streamText, CoreMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey : process.env.OPEN_AI_KEY,
});


// Default confguration options
const OPEN_AI_CONFIG = {
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
}

// Chat API To stream chat to OpenAI
export async function POST(request : Request ) {
  const {messages} :{ messages :  CoreMessage[]} = await request.json();
  const result = await streamText({
      model : openai("gpt-3.5-turbo"),
      ...OPEN_AI_CONFIG,
    messages
  })
  return result.toAIStreamResponse();

}
