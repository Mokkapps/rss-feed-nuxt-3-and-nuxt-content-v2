import { serverQueryContent } from '#content/server';
import RSS from 'rss';

export default defineEventHandler(async (event) => {
  const feed = new RSS({
    title: 'Michael Hoffmann',
    site_url: 'https://mokkapps.de',
    feed_url: `https://mokkapps.de/rss.xml`,
  });

  const docs = await serverQueryContent(event)
    .sort({ date: -1 })
    .where({ _partial: false })
    .find();

  const blogPosts = docs.filter((doc) => doc?._path?.includes('/blog'));
  for (const doc of blogPosts) {
    feed.item({
      title: doc.title ?? '-',
      url: `https://mokkapps.de${doc._path}`,
      date: doc.date,
      description: doc.description,
    });
  }

  const feedString = feed.xml({ indent: true });
  event.res.setHeader('content-type', 'text/xml');
  event.res.end(feedString);
});
