import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';
import useSWR from 'swr';
import { PostAgent } from '../../../../lib/axios/agent';
import { PostKeys } from '../../../../lib/swr/keys';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import { IMiniPost } from '../../../../models/posts/post';
import Loading from '../../../common/Loading';
import BlogCard from '../../post/sub-components/BlogCard';
import Pagination from '../../post/sub-components/Pagination';

const NewsArticles = () => {
  const router = useRouter();
  const [order, setOrder] = useState<'latest' | 'top'>('latest');
  const orderQs = useCallback(
    () =>
      order === 'top' ? 'orderBy.likesNum=DESC' : 'orderBy.createdAt=DESC',
    [order]
  );

  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : undefined;

  const fetcher = () =>
    PostAgent.newsList(qs ? `${qs}&${orderQs()}` : `?${orderQs()}`);

  const { data: postsData, error } = useSWR<
    IPaginated<IMiniPost>,
    AxiosError<INestError>
  >(
    `${PostKeys.GET_NEWS_LIST}${qs ? `${qs}&${orderQs()}` : `?${orderQs()}`}`,
    fetcher
  );

  if (error) router.push('/500');
  if (!postsData) return <Loading />;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full mt-20">
        <h2 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
          <span className="text-dark">Our</span>
          <span className="text-primary">&nbsp;News</span>
        </h2>
        <div className="flex justify-center items-center mt-10 sm:mt-0 sm:ml-auto">
          <label
            className={`text-light text-xs sm:text-sm font-bold h-9 rounded-l-lg bg-primary-light px-2 flex justify-center items-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </label>
          <select
            className={`flex justify-center items-center text-xs sm:text-sm h-9 bg-primary-light border-0 rounded-r-lg text-light focus:ring-0`}
            value={order}
            disabled={postsData.items.length === 0}
            onChange={(e) => {
              setOrder(e.target.value as any);
            }}
          >
            <option value="latest">Latest</option>
            <option value="top">Top</option>
          </select>
        </div>
      </div>

      {postsData.items.length === 0 && (
        <div className="w-full mt-20 flex justify-center items-center sm:text-2xl font-bold text-primary/60 border-2 border-primary/60 border-dashed rounded-3xl py-20 px-6">
          Nothing has been posted yet!
        </div>
      )}

      {postsData.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-stretch items-stretch gap-8 relative min-h-[20rem] sm:min-h-[20rem] w-full mt-20">
            {postsData.items.map((p, i) => (
              <BlogCard
                key={i}
                featuredImageUrl={
                  p.featuredImage?.key
                    ? `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${p.featuredImage.key}`
                    : undefined
                }
                authorName={p.createdBy.firstName + ' ' + p.createdBy.lastName}
                commentsNum={p.commentsNum}
                likesNum={p.likesNum}
                bookmarksNum={p.bookmarksNum}
                title={p.title}
                excerpt={p.excerpt ?? ''}
                postUrl={`/news/${p.slug}`}
              />
            ))}
          </div>
          <div className="flex justify-center items center w-full mt-20">
            <Pagination
              currentPage={postsData.meta.currentPage}
              totalPages={postsData.meta.totalPages}
              baseUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/news`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NewsArticles;
