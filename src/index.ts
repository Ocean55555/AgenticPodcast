import { chat } from './llm/localLLM';
import { collectRSS } from './collectors/rssCollector';

async function testCollectRSS() {
  // Sample RSS feeds
  const feeds = [
    { url: 'https://arxiv.org/rss/cs.AI' },
  ];

  try {
    const results = await collectRSS(feeds);
    console.log(`Found ${results.length} items`);
    
    // Show first 3 items
    results.slice(0, 3).forEach((item, i) => {
      console.log(`\nItem ${i + 1}:`);
      console.log(`  Title: ${item.title}`);
      console.log(`  Link: ${item.link}`);
      console.log(`  Date: ${item.pubDate}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testCollectRSS();

// async function testChat() {
//   const messages = [
//     { role: 'system', content: 'You are a helpful assistant.' },
//     { role: 'user', content: 'Hello, how are you?' },
//   ];

//   const response = await chat(messages);
//   console.log('Response from LLM:', response);
// }

// testChat();