import { getInput } from "@actions/core";
import OpenAI from 'openai';

// Get the OpenAI API key from the GitHub Action input, witch is a secret
const OPENAI_API_KEY    = getInput('openaiApiKey');
const OPENAI_USE_MODEL  = getInput('openaiUseModel') || 'gpt-4o';

async function translate(str_md: string, str_prompt: string) {
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: [{ role: 'user', content: str_prompt + str_md }],
        model: OPENAI_USE_MODEL,
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);
    const response = chatCompletion.choices[0].message.content;

    console.log(str_md);
    console.log('-----------------------------------');
    console.log(response);

    return response;
}
