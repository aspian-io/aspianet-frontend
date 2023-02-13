import { AxiosError } from 'axios';
import moment from 'moment';
import { mutate as swrMutate } from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import {
  AdminCommentAgent,
  AdminPostAgent,
  CommentAgent,
} from '../../../../lib/axios/agent';
import { AdminCommentKeys } from '../../../../lib/swr/keys';
import {
  CommentEditFormValues,
  ICommentEntity,
} from '../../../../models/comments/admin/comment';
import { INestError } from '../../../../models/common/error';
import Loading from '../../../common/Loading';
import AdminCard from '../../common/AdminCard';
import { UAParser } from 'ua-parser-js';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Button from '../../../common/Button';
import CommentReplies from './CommentReplies';
import { Form, Formik } from 'formik';
import { CommentCreateFormValues } from '../../../../models/comments/admin/comment';
import { AuthGuard } from '../../../common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import ConfirmModal from '../../../common/ConfirmModal';
import { PostTypeEnum } from '../../../../models/posts/admin/post';

const CommentDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const id = router.query.id as string;

  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [likeLoading, setLikeLoading] = useState(false);
  const [dislikeLoading, setDislikeLoading] = useState(false);

  const [edit, setEdit] = useState(false);

  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [specialLoading, setSpecialLoading] = useState(false);

  const fetcher = () => AdminCommentAgent.details(session, id);

  const {
    data: commentData,
    error,
    mutate,
  } = useSWR<ICommentEntity, AxiosError<INestError>>(
    `${AdminCommentKeys.GET_DETAILS}/${id}`,
    fetcher
  );

  if (error) router.push('/500');
  if (!commentData) return <Loading />;

  const agentParser = new UAParser(commentData?.userAgent);

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE]}
        redirect={false}
      >
        <ConfirmModal
          onCancel={() => {
            setRemoveConfirm(false);
            setItemToDelete(null);
          }}
          onConfirm={async () => {
            try {
              setRemoveLoading(true);
              if (itemToDelete) {
                await AdminCommentAgent.softDelete(session, itemToDelete);
                setItemToDelete(null);
                toast.success('The comment moved to trash.', {
                  className: 'bg-success text-light text-sm',
                });
                router.push('/admin/comments');
              } else {
                toast.error('Something went wrong. Please try again later.', {
                  className: 'bg-danger text-light text-sm',
                });
              }
              setRemoveLoading(false);
              setRemoveConfirm(false);
            } catch (error) {
              toast.error('Something went wrong. Please try again later.', {
                className: 'bg-danger text-light text-sm',
              });
              setRemoveLoading(false);
              setRemoveConfirm(false);
            }
          }}
          show={removeConfirm}
          onConfirmLoading={removeLoading}
          text="Are you sure you want to delete the comment?"
        />
      </AuthGuard>
      <AdminCard className="py-8">
        <div className="flex justify-center items-center w-full space-x-4">
          <Button
            rounded="rounded-xl"
            size="h-9"
            type="button"
            variant="success"
            extraCSSClasses="flex justify-center items-center text-sm w-28"
            disabled={commentData.isApproved || approveLoading}
            onClick={async () => {
              if (!approveLoading && !rejectLoading) {
                try {
                  setApproveLoading(true);
                  await AdminCommentAgent.approve(session, commentData.id);
                  if (
                    commentData.post.type === PostTypeEnum.PROJECT &&
                    commentData.isSpecial
                  ) {
                    // Revalidate Home Page
                    await AdminPostAgent.revalidateHomePage(session);
                  }
                  await mutate();
                  setApproveLoading(false);
                  toast.success('The comment approved successfully.', {
                    className: 'bg-success text-light',
                  });
                } catch (error) {
                  toast.error(
                    'Something went wrong approving the comment, please try again later.',
                    {
                      className: 'bg-danger text-light',
                    }
                  );
                  setApproveLoading(false);
                }
              }
            }}
          >
            {approveLoading && (
              <LoadingSpinner className="h-5 w-5 text-success" />
            )}
            {!approveLoading && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="ml-1">Approve</span>
              </>
            )}
          </Button>
          <Button
            rounded="rounded-xl"
            size="h-9"
            type="button"
            variant="danger"
            extraCSSClasses="flex justify-center items-center text-sm w-28"
            disabled={!commentData.isApproved || rejectLoading}
            onClick={async () => {
              if (!approveLoading && !rejectLoading) {
                try {
                  setRejectLoading(true);
                  await AdminCommentAgent.reject(session, commentData.id);
                  if (
                    commentData.post.type === PostTypeEnum.PROJECT &&
                    commentData.isSpecial
                  ) {
                    // Revalidate Home Page
                    await AdminPostAgent.revalidateHomePage(session);
                  }
                  await mutate();
                  setRejectLoading(false);
                  toast.success('The comment rejected successfully.', {
                    className: 'bg-success text-light',
                  });
                } catch (error) {
                  toast.error(
                    'Something went wrong rejecting the comment, please try again later.',
                    {
                      className: 'bg-danger text-light',
                    }
                  );
                  setRejectLoading(false);
                }
              }
            }}
          >
            {rejectLoading && (
              <LoadingSpinner className="h-5 w-5 text-danger" />
            )}
            {!rejectLoading && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>

                <span className="ml-1">Reject</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex flex-col justify-center items-start rounded-2xl w-full p-4 mt-4 border-primary border-2">
          <div className="text-sm text-light bg-primary px-4 rounded-md mb-1">
            {commentData.createdBy.email}
          </div>
          <div className="text-xs text-zinc-600 mb-1">
            {moment(commentData.createdAt).format('MMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="text-xs text-zinc-500">
            On {agentParser.getOS().name ?? 'Unknown'} device
          </div>
          <div className="text-xs text-zinc-500">
            By using {agentParser.getBrowser().name ?? 'Unknown'} -{' '}
            {agentParser.getBrowser().version ?? 'Unknown'} browser
          </div>
          <div className="text-xs text-zinc-500 mt-2">
            Approval:{' '}
            {commentData.isApproved ? (
              <span className="text-success">Approved</span>
            ) : (
              <span className="text-danger">Not Approved</span>
            )}
          </div>

          <div className="flex justify-start items-center text-xs text-zinc-500 mt-2">
            <span className="mr-1">Special:</span>
            {commentData.isSpecial ? (
              <span className="text-success">Special</span>
            ) : (
              <span className="text-danger">Not Special</span>
            )}
            <span>
              <Button
                rounded="rounded"
                size="h-5"
                type="button"
                variant={commentData.isSpecial ? 'danger' : 'success'}
                extraCSSClasses="flex justify-center items-center text-xs w-12 ml-2"
                disabled={specialLoading}
                onClick={async () => {
                  try {
                    setSpecialLoading(true);
                    await AdminCommentAgent.setUnsetSpecial(
                      session,
                      commentData.id
                    );
                    if (commentData.post.type === PostTypeEnum.PROJECT) {
                      // Revalidate Home Page
                      await AdminPostAgent.revalidateHomePage(session);
                    }

                    await mutate();
                    setSpecialLoading(false);
                  } catch (error) {
                    setSpecialLoading(false);
                    toast.error(
                      'Something went wrong, please try again later.',
                      {
                        className: 'bg-danger text-light',
                      }
                    );
                  }
                }}
              >
                {specialLoading && (
                  <LoadingSpinner
                    className={`h-4 w-4 ${
                      commentData.isSpecial ? 'text-danger' : 'text-success'
                    }`}
                  />
                )}
                {!specialLoading && commentData.isSpecial && 'Unset'}
                {!specialLoading && !commentData.isSpecial && 'Set'}
              </Button>
            </span>
          </div>
          {commentData?.parent && (
            <div className="flex flex-col justify-center items-start bg-zinc-200 rounded-2xl w-full p-4 mt-4">
              <div className="text-sm text-light bg-zinc-400 px-4 rounded-md mb-1">
                {commentData?.parent?.createdBy.email}
              </div>
              <div className="text-xs text-zinc-500">
                {moment(commentData.parent.createdAt).format(
                  'MMM Do YYYY, h:mm:ss a'
                )}
              </div>
              <div className="text-sm text-zinc-700 mt-4">
                {commentData.parent?.content}
              </div>
              <div className="flex flex-row justify-start items-center space-x-8 mt-4">
                <div className="flex justify-center items-center text-zinc-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                  </svg>
                  <div className="ml-2">{commentData.parent.likesNum}</div>
                </div>
                <div className="flex justify-center items-center text-zinc-400 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" />
                  </svg>
                  <div className="ml-2">{commentData.parent.dislikesNum}</div>
                </div>
              </div>
            </div>
          )}

          {!edit && (
            <div className="text-sm text-zinc-700 mt-4">
              {commentData.content}
            </div>
          )}
          {edit && (
            <div className="flex flex-col justify-center items-start w-full my-8">
              <Formik
                initialValues={{
                  content: commentData.content,
                }}
                enableReinitialize
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await AdminCommentAgent.edit(
                      session,
                      commentData.id,
                      new CommentEditFormValues({
                        content: values.content,
                      })
                    );
                    await mutate();
                    setEdit(false);
                    toast.success('The comment modified successfully.', {
                      className: 'bg-success text-light',
                    });
                  } catch (error) {
                    toast.error(
                      'Something went wrong, please try again later.',
                      {
                        className: 'bg-danger text-light',
                      }
                    );
                  }
                }}
              >
                {({
                  isSubmitting,
                  values,
                  handleChange,
                  handleBlur,
                  dirty,
                  isValid,
                }) => (
                  <Form className="w-full">
                    <div className="flex justify-start items-center w-full mb-8">
                      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
                        <div className="text-primary font-semibold mb-2 sm:mb-0">
                          Edit Comment:
                        </div>
                        <div className="flex justify-center items-center sm:ml-auto">
                          <Button
                            rounded="rounded-xl"
                            size="h-9"
                            type="button"
                            variant="primary-outline"
                            extraCSSClasses="flex justify-center items-center text-xs sm:text-sm w-20 sm:w-28"
                            disabled={isSubmitting}
                            onClick={async () => {
                              setEdit(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            rounded="rounded-xl"
                            size="h-9"
                            type="submit"
                            variant="success"
                            extraCSSClasses="flex justify-center items-center text-xs sm:text-sm w-28 ml-2"
                            disabled={!(isValid && dirty) || isSubmitting}
                          >
                            {isSubmitting && (
                              <LoadingSpinner className="h-5 w-5 text-success" />
                            )}
                            {!isSubmitting && 'Save Changes'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <textarea
                      name="content"
                      className={`border-2 border-dashed border-primary rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm focus:border-primary focus:bg-light focus:border-0`}
                      value={values.content}
                      placeholder="Comment..."
                      onBlur={handleBlur}
                      onChange={handleChange}
                    ></textarea>
                  </Form>
                )}
              </Formik>
            </div>
          )}
          <div className="flex flex-row justify-start items-center space-x-8 mt-4">
            <div className="flex justify-center items-center text-success text-xs">
              {likeLoading && (
                <LoadingSpinner className="text-success w-4 h-4" />
              )}
              {!likeLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 cursor-pointer"
                  onClick={async () => {
                    if (!likeLoading && !dislikeLoading) {
                      try {
                        setLikeLoading(true);
                        await CommentAgent.like(session, commentData.id);
                        await mutate();
                        setLikeLoading(false);
                      } catch (error) {
                        toast.error(
                          'Something went wrong liking the comment, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                        setLikeLoading(false);
                      }
                    }
                  }}
                >
                  <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                </svg>
              )}
              <div className="ml-2">{commentData.likesNum}</div>
            </div>
            <div className="flex justify-center items-center text-danger text-xs">
              {dislikeLoading && (
                <LoadingSpinner className="text-danger w-4 h-4" />
              )}
              {!dislikeLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 cursor-pointer"
                  onClick={async () => {
                    if (!likeLoading && !dislikeLoading) {
                      try {
                        setDislikeLoading(true);
                        await CommentAgent.dislike(session, commentData.id);
                        await mutate();
                        setDislikeLoading(false);
                      } catch (error) {
                        toast.error(
                          'Something went wrong disliking the comment, please try again later.',
                          {
                            className: 'bg-danger text-light',
                          }
                        );
                        setDislikeLoading(false);
                      }
                    }
                  }}
                >
                  <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" />
                </svg>
              )}
              <div className="ml-2">{commentData.dislikesNum}</div>
            </div>
            <AuthGuard
              claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_EDIT]}
              redirect={false}
            >
              <div
                className="flex justify-center items-center text-primary-light text-xs"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 cursor-pointer"
                >
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              </div>
            </AuthGuard>
            <AuthGuard
              claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE]}
              redirect={false}
            >
              <div
                className="flex justify-center items-center text-danger text-xs"
                onClick={() => {
                  setItemToDelete(commentData.id);
                  setRemoveConfirm(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </AuthGuard>
          </div>
        </div>

        {commentData.isApproved && (
          <div className="flex flex-col justify-center items-start w-full my-8">
            <Formik
              initialValues={{
                postId: commentData.post.id,
                parentId: commentData.id,
                content: '',
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await AdminCommentAgent.create(
                    session,
                    new CommentCreateFormValues({
                      content: values.content,
                      postId: values.postId,
                      parentId: values.parentId,
                    })
                  );
                  await swrMutate(
                    `${AdminCommentKeys.GET_COMMENT_REPLIES}/${id}`
                  );
                  resetForm();
                  toast.success('You replied to the comment successfully.', {
                    className: 'bg-success text-light',
                  });
                } catch (error) {
                  toast.error('Something went wrong, please try again later.', {
                    className: 'bg-danger text-light',
                  });
                }
              }}
            >
              {({
                isSubmitting,
                values,
                handleChange,
                handleBlur,
                dirty,
                isValid,
              }) => (
                <Form className="w-full">
                  <div className="flex justify-start items-center w-full mb-8">
                    <div className="text-primary font-semibold">Reply:</div>
                    <Button
                      rounded="rounded-xl"
                      size="h-9"
                      type="submit"
                      variant="success"
                      extraCSSClasses="flex justify-center items-center text-sm w-28 ml-auto"
                      disabled={!(isValid && dirty) || isSubmitting}
                      onClick={async () => {}}
                    >
                      {isSubmitting && (
                        <LoadingSpinner className="h-5 w-5 text-success" />
                      )}
                      {!isSubmitting && 'Reply'}
                    </Button>
                  </div>
                  <textarea
                    name="content"
                    className={`border-0 rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm focus:border-2 focus:border-primary focus:bg-light`}
                    maxLength={400}
                    value={values.content}
                    placeholder="Reply content..."
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></textarea>
                </Form>
              )}
            </Formik>
          </div>
        )}

        <div className="text-primary font-semibold my-8">My Replies:</div>
        <CommentReplies />
      </AdminCard>
    </>
  );
};

export default CommentDetails;
