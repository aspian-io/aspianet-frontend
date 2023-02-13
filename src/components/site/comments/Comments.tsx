import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { FC, useState, useMemo, Fragment } from 'react';
import useSWR from 'swr';
import { CommentAgent } from '../../../lib/axios/agent';
import { IComment } from '../../../models/comments/comment';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { PostTypeEnum } from '../../../models/posts/admin/post';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import CommentForm from './sub-components/CommentForm';
import CommentReplies from './sub-components/CommentReplies';
import CommentWrapper from './sub-components/CommentWrapper';
import { swrCommentsKey } from './sub-components/constants';

interface IProps {
  postId: string;
  parentId?: string;
  postType?: PostTypeEnum;
  allowComment: boolean;
}

export interface ICommentTimeStamp {
  id: string;
  timestamp: number;
}

const Comments: FC<IProps> = ({
  postId,
  parentId,
  postType = PostTypeEnum.BLOG,
  allowComment,
}) => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<IComment[]>([]);
  const [page, setPage] = useState(1);
  const [timestamp, setTimestamp] = useState<ICommentTimeStamp[]>([]);

  const fetcher = () => CommentAgent.postCommentsList(postId, page);

  const {
    data: commentsData,
    error,
    mutate,
  } = useSWR<IPaginated<IComment>, AxiosError<INestError>>(
    swrCommentsKey(postId, page),
    fetcher
  );

  const isLoadingInitialData = !commentsData && !error;

  useMemo(() => {
    if (commentsData) {
      setComments((prev) => {
        const newList = commentsData.items.map((ci) => {
          const oldComment = prev.find((c) => c.id === ci.id);
          if (
            oldComment &&
            oldComment.ancestorChildrenNum === ci.ancestorChildrenNum
          ) {
            return oldComment;
          } else {
            setTimestamp((prev) => [
              ...prev.filter((p) => p.id !== ci.id),
              {
                id: ci.id,
                timestamp: Date.now(),
              },
            ]);
            return ci;
          }
        });
        const newListIds = newList.map((nl) => nl.id);
        const oldList = prev.filter((ol) => !newListIds.includes(ol.id));
        return [...oldList, ...newList];
      });
    }
  }, [commentsData]);

  const showForm = useMemo(
    () =>
      commentsData?.items &&
      postType === PostTypeEnum.PROJECT &&
      commentsData.items.length > 0
        ? false
        : true,
    [commentsData?.items, postType]
  );

  return (
    <div className="flex flex-col justify-center items-start my-10 transition-all w-full duration-300">
      <div className="text-xl sm:text-2xl font-bold text-dark mb-4 sm:mb-6">
        {postType === PostTypeEnum.PROJECT ? 'Customer Comment' : 'Comments'}
      </div>
      {allowComment && (
        <>
          {status === 'authenticated' && showForm && (
            <div className="mt-4 mb-10 w-full">
              <CommentForm
                postId={postId}
                parentId={parentId}
                onSuccess={async () => await mutate()}
              />
            </div>
          )}
          {status !== 'authenticated' && postType !== PostTypeEnum.PROJECT && (
            <div className="flex flex-wrap text-center justify-center items-center mt-4 px-4 py-8 w-full bg-primary/10 border-primary border-2 text-primary sm:text-lg rounded-3xl">
              <span className="mr-1">Please</span>
              <Link href="/auth/login" className="text-blue-600">
                login
              </Link>
              <span className="ml-1">first to be able to leave comments.</span>
            </div>
          )}
        </>
      )}
      <div className="mt-5 w-full flex flex-col justify-center items-center">
        {comments &&
          comments.length > 0 &&
          comments.map((c, i) => (
            <Fragment key={i}>
              <CommentWrapper
                comment={c}
                postId={postId}
                postType={postType}
                allowComment={allowComment}
                onReplySuccess={async (comment) => {
                  await mutate();
                  setTimestamp((prev) => {
                    const oldTimeStamp = prev.find((ots) => ots.id === c.id);
                    if (oldTimeStamp) {
                      return [
                        ...prev.filter((p) => p.id !== c.id),
                        { id: c.id, timestamp: Date.now() },
                      ];
                    } else {
                      return [...prev, { id: c.id, timestamp: Date.now() }];
                    }
                  });
                }}
              />
              {c.ancestorChildrenNum > 0 && (
                <CommentReplies
                  ancestorId={c.id}
                  postId={postId}
                  timestamp={timestamp.find((ts) => ts.id === c.id)}
                />
              )}
            </Fragment>
          ))}

        {commentsData?.meta &&
          commentsData?.meta.currentPage < commentsData?.meta.totalPages && (
            <div className="mt-10 sm:mt-20 relative flex justify-center items-center w-full text-primary">
              <Button
                rounded="rounded-lg sm:rounded-xl"
                size="h-8 sm:h-10"
                type="button"
                variant="primary-outline"
                extraCSSClasses="w-44 sm:w-56 flex justify-center items-center space-x-1 text-xs sm:text-base"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Load more comments
              </Button>
            </div>
          )}
        {isLoadingInitialData && (
          <div className="mt-10 sm:mt-20 relative flex justify-center items-center w-full text-primary">
            <Button
              rounded="rounded-lg sm:rounded-xl"
              size="h-8 sm:h-10"
              type="button"
              variant="primary-outline"
              extraCSSClasses="w-44 sm:w-56 flex justify-center items-center space-x-1 text-xs sm:text-base"
            >
              <LoadingSpinner className="w-5 h-5 text-primary" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
