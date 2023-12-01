import React from 'react';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet';
import Spinner from '@/components/Spinner';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';

const DivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  {loading: Spinner}
);

export async function generateMetadata({ params }) {
  const {frontmatter, content} = await loadBlogPost(params.postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract
  };
}

async function BlogPost({params}) {
  const {frontmatter, content} = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            DivisionGroupsDemo,
            pre: CodeSnippet,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
