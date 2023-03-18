import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { PostAgent } from '../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { PostKeys } from '../../../lib/swr/keys';
import { AvatarSourceEnum } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IPost, IPostStat } from '../../../models/posts/post';
import { TaxonomyTypeEnum } from '../../../models/taxonomies/admin/taxonomy';
import { ITaxonomy } from '../../../models/taxonomies/taxonomy';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import FacebookLogo from '../../common/vectors/FacebookLogo';
import GitHubLogo from '../../common/vectors/GitHubLogo';
import InstagramLogo from '../../common/vectors/InstagramLogo';
import LinkedInLogo from '../../common/vectors/LinkedInLogo';
import StackOverflowLogo from '../../common/vectors/StackOverflowLogo';
import TwitterLogo from '../../common/vectors/TwitterLogo';
import Comments from '../comments/Comments';
import BlogRelatedArticles from './sub-components/BlogRelatedArticles';
import { Link as SpyLink, Element as SpyElement } from 'react-scroll';

interface IProps {
  article: IPost;
  statData?: IPostStat;
  heading?: boolean;
  author?: boolean;
  comments?: boolean;
  relatedArticles?: boolean;
}

const BlogArticle: FC<IProps> = ({
  article,
  statData = undefined,
  heading = true,
  author = true,
  comments = true,
  relatedArticles = true,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [like, setLike] = useState(
    session && article.likes ? article.likes.includes(session?.user.id) : false
  );
  const [bookmark, setBookmark] = useState(
    session && article.bookmarks
      ? article.bookmarks.includes(session?.user.id)
      : false
  );

  function getCommaSeparatedCategoriesString(taxonomies: ITaxonomy[]): string {
    const categories = taxonomies.filter(
      (t) => t.type === TaxonomyTypeEnum.CATEGORY
    );
    if (categories.length > 0) return categories.map((t) => t.term).join(', ');

    return '';
  }

  return (
    <div className="flex flex-col justify-center items-start mt-10 transition-all duration-300 w-full">
      {heading && (
        <Button
          rounded="rounded-xl"
          size="h-9"
          type="button"
          variant="link"
          extraCSSClasses="flex justify-center items-center pr-4 text-primary text-sm"
          onClick={() => router.push('/blog')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2">Blog</span>
        </Button>
      )}
      {heading && (
        <h1 className="text-dark font-bold text-xl sm:text-3xl mt-10">
          {article.title}
        </h1>
      )}
      {heading && (
        <h2 className="text-primary font-bold sm:text-xl my-2">
          {getCommaSeparatedCategoriesString(article.taxonomies)}
        </h2>
      )}
      {heading && (
        <div className="relative w-full h-56 xs:h-72 sm:h-96 lg:h-[36rem] xl:h-[46rem] rounded-xl sm:rounded-3xl overflow-hidden mt-4">
          {article.featuredImage?.key && (
            <Image
              className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
              src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${article.featuredImage.key}`}
              fill
              style={{
                objectFit: 'cover',
              }}
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={article.featuredImage.imageAlt ?? 'Blog Img'}
            />
          )}
          {!article.featuredImage?.key && (
            <div className="absolute inset-0 bg-primary flex justify-center items-center text-light/50 text-2xl sm:text-5xl font-bold">
              No Photo
            </div>
          )}
        </div>
      )}
      {heading && (
        <div className="flex justify-start items-center text-zinc-500 w-full my-10 space-x-2 xs:space-x-4 md:space-x-16 text-xs xs:text-sm">
          <div className="flex justify-start items-center mr-auto">
            <div className="flex justify-center items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span className="w-16 xs:w-28 truncate">
                By {article.createdBy.firstName} {article.createdBy.lastName}
              </span>
            </div>
          </div>

          <SpyLink
            className="flex justify-center items-center space-x-1 cursor-pointer"
            to="comments"
            spy={true}
            smooth={true}
            offset={-115}
            duration={300}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            {!statData && <LoadingSpinner className="w-4 h-4 text-primary" />}
            {statData && <span>{statData.commentsNum}</span>}
          </SpyLink>
          <div className="flex justify-center items-center space-x-1">
            {!session && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
            {session &&
              (article.likes.includes(session.user.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-4 h-4 sm:w-6 sm:h-6 text-danger ${
                    session ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    if (session) {
                      if (statData) statData.likesNum -= 1;
                      article.likes = article.likes.filter(
                        (l) => l !== session.user.id
                      );
                      setLike((prev) => !prev);
                      try {
                        await PostAgent.like(session, article.id);
                      } catch (error) {
                        if (statData) statData.likesNum += 1;
                        article.likes.push(session.user.id);
                        toast.error(
                          'Something went wrong, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                      }
                    }
                  }}
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-4 h-4 sm:w-6 sm:h-6 ${
                    session ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    if (session) {
                      if (statData) statData.likesNum += 1;
                      article.likes.push(session.user.id);
                      setLike((prev) => !prev);

                      try {
                        await PostAgent.like(session, article.id);
                      } catch (error) {
                        if (statData) statData.likesNum -= 1;
                        article.likes = article.likes.filter(
                          (l) => l !== session.user.id
                        );
                        toast.error(
                          'Something went wrong, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                      }
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              ))}
            {!statData && <LoadingSpinner className="w-4 h-4 text-primary" />}
            {statData && <span>{statData.likesNum}</span>}
          </div>
          <div className="flex justify-center items-center space-x-1">
            {!session && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
            )}
            {session &&
              (article.bookmarks.includes(session.user.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-6 sm:h-6 text-primary cursor-pointer"
                  onClick={async () => {
                    if (session) {
                      if (statData) statData.bookmarksNum -= 1;
                      article.bookmarks = article.bookmarks.filter(
                        (b) => b !== session.user.id
                      );
                      setBookmark((prev) => !prev);
                      try {
                        await PostAgent.bookmark(session, article.id);
                      } catch (error) {
                        if (statData) statData.bookmarksNum += 1;
                        article.bookmarks.push(session.user.id);
                        toast.error(
                          'Something went wrong, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                      }
                    }
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
                  onClick={async () => {
                    if (session) {
                      if (statData) statData.bookmarksNum += 1;
                      article.bookmarks.push(session.user.id);
                      setBookmark((prev) => !prev);

                      try {
                        await PostAgent.bookmark(session, article.id);
                      } catch (error) {
                        if (statData) statData.bookmarksNum -= 1;
                        article.bookmarks = article.bookmarks.filter(
                          (b) => b !== session.user.id
                        );
                        toast.error(
                          'Something went wrong, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                      }
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              ))}
            {!statData && <LoadingSpinner className="w-4 h-4 text-primary" />}
            {statData && <span>{statData.bookmarksNum}</span>}
          </div>
          <div className="flex justify-center items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Article address copied to clipboard!', {
                  className: 'bg-success text-light text-sm',
                  position: 'top-center',
                  autoClose: 2000,
                  hideProgressBar: true,
                });
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </div>
        </div>
      )}
      {article.content && (
        <div
          className="text-zinc-700 pt-10 text-sm sm:text-base lg:text-lg no-tailwindcss-base"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      )}
      {author && (
        <div className="flex flex-col lg:flex-row justify-center items-center border-2 border-dashed border-primary rounded-2xl sm:rounded-3xl p-8 text-zinc-700 my-10 w-full">
          <div className="relative xs:min-w-[18rem] w-full h-60 xs:w-72 xs:h-72 rounded-xl sm:rounded-3xl overflow-hidden">
            {article.createdBy.avatar && (
              <Image
                className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                src={
                  article.createdBy.avatarSource === AvatarSourceEnum.STORAGE
                    ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${article.createdBy.avatar}`
                    : `${article.createdBy.avatar}`
                }
                fill
                sizes="(max-width: 24rem) 100vw"
                placeholder="blur"
                blurDataURL={imgPlaceholderDataURL}
                alt={`${article.createdBy.firstName} ${article.createdBy.lastName} avatar`}
              />
            )}
            {!article.createdBy.avatar && (
              <div className="absolute inset-0 flex justify-center items-center bg-primary text-light/60 text-xl font-bold">
                No Avatar
              </div>
            )}
          </div>
          <div className="flex flex-col mt-4 lg:mt-0 sm:ml-8 py-2 w-full">
            <p className="text-sm xs:text-lg mb-2">Written By:</p>
            <p className="text-lg xs:text-2xl font-bold">
              {article.createdBy.firstName} {article.createdBy.lastName}
            </p>
            <p className="text-base xs:text-xl text-zinc-400">
              {article.createdBy.role}
            </p>
            <p className="text-xs xs:text-sm mt-2 line-clamp-6">
              {article.createdBy.bio}
            </p>
            <div className="flex justify-start items-center space-x-2 xs:space-x-4 sm:space-x-6 mt-6">
              {article.createdBy.facebook && (
                <Link href={article.createdBy.facebook} target="_blank">
                  <FacebookLogo className="w-6 h-6" />
                </Link>
              )}
              {article.createdBy.instagram && (
                <Link href={article.createdBy.instagram} target="_blank">
                  <InstagramLogo className="w-5 h-5 fill-pink-700" />
                </Link>
              )}
              {article.createdBy.twitter && (
                <Link href={article.createdBy.twitter} target="_blank">
                  <TwitterLogo className="w-7 h-7" />
                </Link>
              )}
              {article.createdBy.linkedIn && (
                <Link href={article.createdBy.linkedIn} target="_blank">
                  <LinkedInLogo className="w-4 h-4" />
                </Link>
              )}
              {article.createdBy.github && (
                <Link href={article.createdBy.github} target="_blank">
                  <GitHubLogo className="w-5 h-5" />
                </Link>
              )}
              {article.createdBy.stackoverflow && (
                <Link href={article.createdBy.stackoverflow} target="_blank">
                  <StackOverflowLogo className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {relatedArticles && (
        <div className="mt-10 w-full">
          <BlogRelatedArticles
            tags={article.taxonomies.filter(
              (t) => t.type === TaxonomyTypeEnum.TAG
            )}
          />
        </div>
      )}
      {comments && (
        <SpyElement className="mt-10 w-full" name="comments">
          <Comments postId={article.id} allowComment={article.commentAllowed} />
        </SpyElement>
      )}
    </div>
  );
};

export default BlogArticle;
