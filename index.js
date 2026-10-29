#!/usr/bin/env node

import 'dotenv/config';
import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY environment variable is missing.');
  process.exit(1);
}

const openai = new OpenAI();
const args = process.argv.slice(2);
const userInput = args.join(' ');

if (!userInput) {
  console.log('🍞 ToastGPT: "Give me a failed command or an error message to roast!"');
  process.exit(0);
}

async function main() {
  try {
    console.log('⏳ Toasting your failure...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are ToastGPT, a highly sarcastic AI terminal assistant that acts like a sentient bread toaster. 
          The user is a software developer who just messed up. 
          Your job is to roast their failed command, git mistake, or code error using hilarious bread, baking, crumb, and toaster metaphors. 
          Keep the response short (1-3 sentences maximum), punchy, and witty.`
        },
        {
          role: 'user',
          content: `I tried to run this or got this error: "${userInput}"`
        }
      ],
      temperature: 0.8,
    });

    console.log('\n🔥 ToastGPT says:');
    console.log(`=========================================`);
    console.log(response.choices.message.content);
    console.log(`=========================================`);

  } catch (error) {
    console.error('\n❌ Even the toaster broke:', error.message);
  }
}

main();
