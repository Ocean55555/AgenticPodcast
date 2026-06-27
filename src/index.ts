import { chat } from './llm/LocalLLM';

async function main() {
  const messages = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how are you?' },
  ];

  const response = await chat(messages);
  console.log('Response from LLM:', response);
}

main();