export async function chat(messages: {role: string, content: string}[]): Promise<string> {
  const res = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.2', messages, stream: false }),
  });
  const data = await res.json() as { message: { content: string } };
  return data.message.content;
}