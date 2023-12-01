import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';

import { getBlogPostList } from '@/helpers/file-helpers';

import { BLOG_TITLE } from '@/constants'

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about JavaScript'
}

async function Home() {
  const blogPostList = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>
        Latest Content:
      </h1>

      {blogPostList.map(p => (
        <BlogSummaryCard
          key={p.slug}  
          slug={p.slug}
          title={p.title}
          abstract={p.abstract}
          publishedOn={new Date(p.publishedOn)}
        />
        )
      )}
    </div>
  );
}

export default Home;
