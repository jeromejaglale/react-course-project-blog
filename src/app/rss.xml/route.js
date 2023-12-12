import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
} from '@/constants';
 
export async function GET() { 
/* create rss feed */
var feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
});

const blogPostList = await getBlogPostList();

/* loop over data and add to feed */
blogPostList.forEach(p => {
	feed.item({
	    title: p.title,
	    description: p.abstract,
	    url: `localhost/${p.slug}`,
	    date: p.publishedOn, // any format that js Date can parse.
	});

});
 
// cache the xml to send to clients
var xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}