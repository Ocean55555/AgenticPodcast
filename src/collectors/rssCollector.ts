import Parser from 'rss-parser';


type Feeds = {
  url: string;
};


export async function collectRSS(feeds: Feeds[]) {
  const parser = new Parser();

  const results = await Promise.allSettled(
    feeds.map(feed => parser.parseURL(feed.url))
  );

  const items = results
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => result.value.items);

  const seen = new Set<string>();

  const deduplicated = items.filter(item => {
    const key = item.link || item.guid || item.title;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });

  return deduplicated.sort((a, b) => {
    const dateA = new Date(a.pubDate || '').getTime();
    const dateB = new Date(b.pubDate || '').getTime();

    return dateB - dateA;
  });
}