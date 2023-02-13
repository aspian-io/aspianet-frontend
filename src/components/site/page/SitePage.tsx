import React, { FC } from 'react';
import { IPost } from '../../../models/posts/post';
import BlogArticle from '../blog/BlogArticle';

interface IProps {
  page: IPost;
}

const SitePage: FC<IProps> = ({ page }) => {
  const subtitleSegments = page.subtitle ? page.subtitle.split(' ') : undefined;

  return (
    <div className="flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h1 className="text-primary text-sm">{page.title}</h1>
        {subtitleSegments && subtitleSegments.length > 1 && (
          <h2 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">{subtitleSegments[0]}</span>
            <span className="text-primary">
              &nbsp;
              {subtitleSegments
                .filter((s) => s !== subtitleSegments[0])
                .join(' ')}
            </span>
          </h2>
        )}
        {subtitleSegments && subtitleSegments.length === 1 && (
          <h2 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-primary">{subtitleSegments[0]}</span>
          </h2>
        )}
      </div>
      <BlogArticle
        article={page}
        heading={false}
        author={false}
        comments={page.commentAllowed}
        relatedArticles={false}
      />
    </div>
  );
};

export default SitePage;
