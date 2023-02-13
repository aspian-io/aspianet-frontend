import React from 'react';
import BlogArticles from './sub-components/BlogArticles';
import BlogHeading from './sub-components/BlogHeading';

const Blog = () => {
  return (
    <div className="flex flex-col justify-start items-start lg:items-start py-10 sm:py-20 px-4 transition-all duration-300">
      <BlogHeading />
      <BlogArticles />
    </div>
  );
};

export default Blog;
