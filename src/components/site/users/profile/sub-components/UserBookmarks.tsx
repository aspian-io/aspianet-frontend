import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { UserAgent } from '../../../../../lib/axios/agent';
import { UserKeys } from '../../../../../lib/swr/keys';
import { INestError } from '../../../../../models/common/error';
import { IPaginated } from '../../../../../models/common/paginated-result';
import { IBookmarkPost } from '../../../../../models/users/bookmark';
import Loading from '../../../../common/Loading';
import BlogCard from '../../../post/sub-components/BlogCard';
import Pagination from '../../../post/sub-components/Pagination';

const UserBookmarks = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const page = router.query['page'] ? +router.query['page'] : 1;
  const fetcher = () => UserAgent.getBookmarks(page, session);
  const { data: profileData, error } = useSWR<
    IPaginated<IBookmarkPost>,
    AxiosError<INestError>
  >(`${UserKeys.GET_BOOKMARKS}?page=${page}`, fetcher);

  if (error) router.push('/500');
  if (!profileData) return <Loading />;

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1 before:-left-3">
          Bookmarks
        </h3>
      </div>
      <div className="py-6 w-full">
        <hr className="border-zinc-200" />
      </div>
      <div className="flex flex-wrap justify-center items-center w-full gap-6 transition-all duration-500">
        {profileData.items.map((p, i) => (
          <div
            className="min-w-[16rem] lg:max-w-[18rem] xl:max-w-sm 2xl:max-w-xs transition-all duration-500"
            key={i}
          >
            <BlogCard
              featuredImageUrl={
                p.featuredImage
                  ? `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${p.featuredImage.key}`
                  : undefined
              }
              authorName={`${p.createdBy.firstName}`}
              commentsNum={p.comments}
              likesNum={p.likes}
              bookmarksNum={p.bookmarks}
              title={p.title}
              excerpt={p.excerpt ? p.excerpt : ''}
              postUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/blog/${p.slug}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center items center w-full mt-12">
        {!!profileData.meta.totalPages && (
          <Pagination
            currentPage={profileData.meta.currentPage}
            totalPages={profileData.meta.totalPages}
            baseUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/users/profile`}
            queryString="tab=bookmarks"
          />
        )}
      </div>
    </>
  );
};

export default UserBookmarks;
