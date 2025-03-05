'use server'

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});


// Default confguration options
const OPEN_AI_CONFIG = {
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
}


const callOpenAI = async (messages : Array<ChatCompletionMessageParam>) => (
    await openai.chat.completions.create({
        ...OPEN_AI_CONFIG,
        messages : messages as Array<ChatCompletionMessageParam>
    })
);

export {
    callOpenAI
}

