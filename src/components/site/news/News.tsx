import React from 'react';
import NewsArticles from './sub-components/NewsArticles';
import NewsHeading from './sub-components/NewsHeading';

const News = () => {
  return (
    <div className="flex flex-col justify-start items-start lg:items-start py-10 sm:py-20 px-4 transition-all duration-300">
      <NewsHeading />
      <NewsArticles />
    </div>
  );
};

export default News;
