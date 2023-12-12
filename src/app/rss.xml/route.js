import { getBlogPostList } from '@/helpers/file-helpers';

export const dynamic = 'force-dynamic' // defaults to auto
 
export async function GET() { 
/* create rss feed */
var RSS = require('rss');
var feed = new RSS({
    title: 'Bits & Bytes',
    custom_namespaces: {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    },
});

const blogPostList = await getBlogPostList();

/* loop over data and add to feed */
blogPostList.map(p => {
	feed.item({
	    title: p.title,
	    description: p.abstract,
	    url: `localhost/${p.slug}`,
	    date: new Date(p.publishedOn), // any format that js Date can parse.
	});

});
 
// cache the xml to send to clients
var xml = feed.xml();

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}