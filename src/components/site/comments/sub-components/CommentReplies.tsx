import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import React, { FC, useState, useMemo } from 'react';
import useSWR from 'swr';
import { CommentAgent } from '../../../../lib/axios/agent';
import { IComment } from '../../../../models/comments/comment';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import LoadingSpinner from '../../../common/LoadingSpinner';
import { ICommentTimeStamp } from '../Comments';
import CommentWrapper from './CommentWrapper';
import { swrRepliesKey } from './constants';

interface IProps {
  postId: string;
  ancestorId: string;
  timestamp?: ICommentTimeStamp;
}

const CommentReplies: FC<IProps> = ({ postId, ancestorId, timestamp }) => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState(1);

  const limit = 10;

  const fetcher = () =>
    CommentAgent.commentRepliesByAncestorId(ancestorId, page, limit);

  const {
    data: repliesData,
    error,
    mutate,
  } = useSWR<IPaginated<IComment>, AxiosError<INestError>>(
    `${swrRepliesKey(ancestorId, page, limit)}-${timestamp?.timestamp}`,
    fetcher
  );

  const isLoadingInitialData = !repliesData && !error;

  useMemo(() => {
    if (repliesData?.items && comments.length < repliesData.meta.totalItems)
      setComments((prev) => [
        ...prev,
        ...repliesData.items.filter((ci) => !prev.find((c) => c.id === ci.id)),
      ]);
  }, [comments.length, repliesData?.items, repliesData?.meta.totalItems]);

  const currentItemsCount = useMemo(
    () =>
      repliesData?.meta
        ? repliesData.meta.currentPage * repliesData.meta.itemCount
        : 0,
    [repliesData?.meta]
  );

  const remainingItems = useMemo(
    () =>
      repliesData?.meta && page < repliesData?.meta.totalPages
        ? repliesData.meta.totalItems - currentItemsCount
        : 0,
    [currentItemsCount, page, repliesData?.meta]
  );

  return (
    <>
      <div className="pl-5 sm:pl-20 mt-10 w-full">
        {comments &&
          comments.length > 0 &&
          comments.map((c, i) => (
            <CommentWrapper
              key={i}
              comment={c}
              postId={postId}
              onReplySuccess={async () => await mutate()}
            />
          ))}
      </div>
      {isLoadingInitialData && (
        <div className="my-10 relative flex justify-start items-center before:absolute before:bg-primary before:w-9 xs:before:w-16 before:h-0.5 before:ml-5 sm:before:ml-20 before:rounded w-full">
          <div className="pl-16 sm:pl-40 text-primary text-xs xs:text-sm cursor-pointer">
            {isLoadingInitialData && <LoadingSpinner className="w-4 h-4" />}
          </div>
        </div>
      )}
      {remainingItems !== 0 && (
        <div className="my-10 relative flex justify-start items-center before:absolute before:bg-primary before:w-9 xs:before:w-16 before:h-0.5 before:ml-5 sm:before:ml-20 before:rounded w-full">
          <div
            className="pl-16 sm:pl-40 text-primary text-xs xs:text-sm cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load {remainingItems > limit ? limit : remainingItems} more replies
          </div>
        </div>
      )}
    </>
  );
};

export default CommentReplies;
