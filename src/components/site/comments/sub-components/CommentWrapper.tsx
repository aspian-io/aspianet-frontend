import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CommentAgent } from '../../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { AvatarSourceEnum } from '../../../../models/auth/common';
import { IComment } from '../../../../models/comments/comment';
import { PostTypeEnum } from '../../../../models/posts/admin/post';
import Button from '../../../common/Button';
import CommentForm from './CommentForm';

interface IProps {
  postId: string;
  comment: IComment;
  postType?: PostTypeEnum;
  allowComment: boolean;
  onReplySuccess?: (comment: IComment) => any;
}

const CommentWrapper: FC<IProps> = ({
  comment,
  postId,
  postType = PostTypeEnum.BLOG,
  allowComment,
  onReplySuccess = () => {},
}) => {
  const { data: session, status } = useSession();
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  const [like, setLike] = useState(
    session && comment.likes ? comment.likes.includes(session?.user.id) : false
  );
  const [dislike, setDislike] = useState(
    session && comment.dislikes
      ? comment.dislikes.includes(session?.user.id)
      : false
  );

  useEffect(() => {
    setLike(
      session && comment.likes
        ? comment.likes.includes(session?.user.id)
        : false
    );
    setDislike(
      session && comment.dislikes
        ? comment.dislikes.includes(session?.user.id)
        : false
    );
  }, [comment.dislikes, comment.likes, session]);

  return (
    <>
      <div className="flex flex-col justify-center items-start p-8 bg-zinc-100 text-zinc-600 w-full rounded-3xl first:mt-0 mt-10">
        <div className="flex justify-start items-center w-full">
          <div className="relative min-w-[2.75rem] w-11 h-11 rounded-lg overflow-hidden">
            {comment.avatar && (
              <Image
                className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                src={
                  comment.avatarSource === AvatarSourceEnum.STORAGE
                    ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${comment.avatar}`
                    : comment.avatar
                }
                fill
                sizes="(max-width: 24rem) 100vw"
                placeholder="blur"
                blurDataURL={imgPlaceholderDataURL}
                priority
                alt={'Blog Img'}
              />
            )}
            {!comment.avatar && (
              <div className="absolute inset-0 flex justify-center items-center bg-primary text-light/60 text-3xl">
                {comment.firstName[0]?.toUpperCase() ?? 'U'}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-start ml-4">
            <div className="font-bold">
              {comment.firstName} {comment.lastName}
            </div>
            {postType !== PostTypeEnum.PROJECT && comment.role && (
              <div className="bg-primary text-light px-2 rounded mt-1 text-xs">
                {comment.role}
              </div>
            )}
            {postType === PostTypeEnum.PROJECT && (
              <div className="bg-primary text-light px-2 rounded mt-1 text-xs">
                Customer
              </div>
            )}
          </div>

          <div className="text-zinc-400 ml-auto text-xs xs:inline hidden">
            {moment(comment.createdAt).fromNow()}
          </div>
        </div>
        <div className="flex justify-start items-center mt-4">
          {comment.content}
        </div>
        {postType !== PostTypeEnum.PROJECT && (
          <div className="flex justify-start items-center mt-4 space-x-4 xs:space-x-8">
            <div className="flex justify-center items-center text-zinc-400 text-xs space-x-1">
              {like ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 text-success ${
                    status === 'authenticated' ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    if (session) {
                      comment.likesNum -= 1;
                      setLike((prev) => !prev);
                      try {
                        await CommentAgent.like(session, comment.id);
                      } catch (error) {
                        comment.likesNum += 1;
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
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    status === 'authenticated' ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    if (session) {
                      comment.likesNum += 1;
                      setLike((prev) => !prev);

                      try {
                        await CommentAgent.like(session, comment.id);
                        if (dislike) {
                          setDislike(false);
                          comment.dislikesNum -= 1;
                        }
                      } catch (error) {
                        comment.likesNum -= 1;
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
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              )}
              <span>{comment.likesNum}</span>
            </div>
            <div className="flex justify-center items-center text-zinc-400 text-xs space-x-1">
              {dislike ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 text-danger ${
                    status === 'authenticated' ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    comment.dislikesNum -= 1;
                    setDislike((prev) => !prev);

                    try {
                      await CommentAgent.dislike(session, comment.id);
                    } catch (error) {
                      comment.dislikesNum += 1;
                    }
                  }}
                >
                  <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    status === 'authenticated' ? 'cursor-pointer' : ''
                  }`}
                  onClick={async () => {
                    comment.dislikesNum += 1;
                    setDislike((prev) => !prev);

                    try {
                      await CommentAgent.dislike(session, comment.id);
                      if (like) {
                        comment.likesNum -= 1;
                        setLike(false);
                      }
                    } catch (error) {
                      comment.dislikesNum -= 1;
                    }
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
              )}
              <span>{comment.dislikesNum}</span>
            </div>
            {allowComment && status === 'authenticated' && (
              <Button
                rounded="rounded-md"
                size="h-5"
                type="button"
                variant="primary-outline"
                extraCSSClasses="px-1 flex justify-center items-center space-x-1 text-xs"
                onClick={() => setDisplayReplyForm((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Reply</span>
              </Button>
            )}
          </div>
        )}
      </div>
      {allowComment &&
        status === 'authenticated' &&
        postType !== PostTypeEnum.PROJECT && (
          <div
            className={`w-full transition-transform duration-300 ${
              displayReplyForm
                ? 'visible mt-10 scale-y-100 origin-top'
                : 'invisible scale-y-0 h-0 origin-bottom'
            }`}
          >
            <CommentForm
              postId={postId}
              parentId={comment.id}
              placeholder="Leave your reply here..."
              submitBtnText="Reply"
              onSuccess={async (comment) => {
                setDisplayReplyForm(false);
                await onReplySuccess(comment);
              }}
            />
          </div>
        )}
    </>
  );
};

export default CommentWrapper;
