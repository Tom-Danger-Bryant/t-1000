/** 
 * This is the deprecated version of streaming
 * This was implemented before discovering the `ai` library by vercel
 * */
import OpenAI from 'openai';
import {StreamingTextResponse, OpenAIStream } from 'ai';

const openai = new OpenAI({
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
  const {messages} = await request.json();
  const response = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
    ...OPEN_AI_CONFIG,
    stream : true
  });


  const stream = OpenAIStream(response);
  

  return new StreamingTextResponse(stream)

}
