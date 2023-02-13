import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import Button from '../../../common/Button';

export interface IBlogCardProps {
  featuredImageUrl?: string;
  authorName: string;
  commentsNum: number;
  likesNum: number;
  bookmarksNum: number;
  title: string;
  excerpt: string;
  postUrl: string;
}

const BlogCard: FC<IBlogCardProps> = ({
  featuredImageUrl,
  authorName,
  commentsNum,
  likesNum,
  bookmarksNum,
  title,
  excerpt,
  postUrl,
}) => {
  return (
    <div className="flex flex-col w-full h-[26rem] sm:h-[28rem]">
      <div
        className={`relative flex justify-center w-full h-1/2 items-center rounded-t-3xl overflow-hidden`}
      >
        {featuredImageUrl ? (
          <Image
            className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
            src={featuredImageUrl}
            fill
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            alt="Featured Image"
          />
        ) : (
          <div className="flex justify-center items-center w-full h-full bg-primary-light rounded-t-xl text-2xl text-light">
            No Image
          </div>
        )}
      </div>
      <div
        className={`flex flex-col justify-start items-start w-full h-1/2 rounded-b-3xl overflow-hidden p-0 m-0 border-x-2 border-b-2 border-primary border-dashed pt-3 pb-4 px-6`}
      >
        <div className="flex justify-between items-center w-full text-zinc-500 text-xs">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </span>
              <span className="mx-0.5 w-14 truncate">By {authorName}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </span>
              <span className="ml-0.5">{commentsNum}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </span>
              <span className="ml-0.5">{likesNum}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              </span>
              <span className="ml-0.5">{bookmarksNum}</span>
            </div>
          </div>
        </div>

        <h5 className="mt-4 text-dark font-bold line-clamp-2 text-sm sm:text-lg w-full">
          {title}
        </h5>
        <p className="mt-2 mb-4 line-clamp-3 text-zinc-600 text-xs sm:text-sm">
          {excerpt}
        </p>

        <div className="flex justify-center items-center w-full mt-auto">
          <Link href={postUrl} passHref>
            <Button
              variant="primary"
              size="h-8"
              rounded="rounded-xl"
              type="button"
              extraCSSClasses="text-xs px-4"
            >
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
