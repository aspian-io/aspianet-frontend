import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminCommentAgent, AdminPostAgent } from '../../../lib/axios/agent';
import { AdminCommentKeys } from '../../../lib/swr/keys';
import { ClaimsEnum } from '../../../models/auth/common';
import { ICommentEntity } from '../../../models/comments/admin/comment';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { AuthGuard } from '../../common/AuthGuard';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import MiniDislike from '../../common/vectors/mini/MiniDislike';
import MiniLike from '../../common/vectors/mini/MiniLike';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  content: string | JSX.Element;
  postTitle: string | JSX.Element;
  likesNum: number;
  dislikesNum: number;
  isApproved: boolean | JSX.Element;
  seen: boolean | JSX.Element;
  actions: JSX.Element;
}

const AdminComments = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [removeLoading, setRemoveLoading] = useState(false);

  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [bulkRemoveConfirm, setBulkRemoveConfirm] = useState(false);
  const [itemsToBulkDelete, setItemsToBulkDelete] = useState<string[] | null>(
    null
  );

  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : '';

  const initialSort = () => {
    if (!router.query['orderBy.createdAt']) {
      return qs ? '&orderBy.createdAt=DESC' : '?orderBy.createdAt=DESC';
    }
    return '';
  };

  const boolIcons = (state: boolean) => (
    <>
      {state && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-success"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!state && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-danger"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  );

  const fetcher = () =>
    AdminCommentAgent.list(session, `${qs}${initialSort()}`);

  const {
    data: commentsData,
    error,
    mutate,
  } = useSWR<IPaginated<ICommentEntity>, AxiosError<INestError>>(
    `${AdminCommentKeys.GET_LIST}${qs}${initialSort()}`,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = useCallback(
    (id: string) => (
      <div className="flex justify-center items-center w-full space-x-2 py-1">
        <Button
          rounded="rounded-md"
          size="h-5"
          type="button"
          variant="primary"
          extraCSSClasses="px-1.5 text-xs"
          onClick={() => {
            router.push(`/admin/comments/details/${id}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE]}>
          <Button
            rounded="rounded-md"
            size="h-5"
            type="button"
            variant="danger"
            extraCSSClasses="px-1.5 text-xs"
            onClick={() => {
              setItemToDelete(id);
              setRemoveConfirm(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </AuthGuard>
      </div>
    ),
    [router]
  );

  const formatData = useCallback(
    (comment: ICommentEntity): IDataType => {
      return {
        id: comment.id,
        content: (
          <div className="flex justify-start items-center">
            {comment.parent && (
              <div className="w-3 mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-3 h-3 -rotate-90 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.232 12.207a.75.75 0 011.06.025l3.958 4.146V6.375a5.375 5.375 0 0110.75 0V9.25a.75.75 0 01-1.5 0V6.375a3.875 3.875 0 00-7.75 0v10.003l3.957-4.146a.75.75 0 011.085 1.036l-5.25 5.5a.75.75 0 01-1.085 0l-5.25-5.5a.75.75 0 01.025-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="line-clamp-1">{comment.content}</div>
          </div>
        ),
        postTitle: comment?.post && <Link href="#">{comment.post.title}</Link>,
        likesNum: comment.likesNum,
        dislikesNum: comment.dislikesNum,
        isApproved: boolIcons(comment.isApproved),
        seen: boolIcons(comment.seen),
        actions: actionsColumn(comment.id),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () => (commentsData ? commentsData.items.map((p) => formatData(p)) : []),
    [commentsData, formatData]
  );

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE]}
        redirect={false}
      >
        <ConfirmModal
          onCancel={() => {
            setBulkRemoveConfirm(false);
            setItemsToBulkDelete(null);
          }}
          onConfirm={async () => {
            try {
              setRemoveLoading(true);
              if (itemsToBulkDelete && itemsToBulkDelete.length > 0) {
                await AdminCommentAgent.softDeleteAll(
                  session,
                  itemsToBulkDelete
                );
                setItemsToBulkDelete(null);
                await mutate();
                toast.success('The selected items moved to trash.', {
                  className: 'bg-success text-light text-sm',
                });
              } else {
                toast.error('Something went wrong. Please try again later.', {
                  className: 'bg-danger text-light text-sm',
                });
              }
              setRemoveLoading(false);
              setBulkRemoveConfirm(false);
            } catch (error) {
              toast.error('Something went wrong. Please try again later.', {
                className: 'bg-danger text-light text-sm',
              });
              setRemoveLoading(false);
              setBulkRemoveConfirm(false);
            }
          }}
          show={bulkRemoveConfirm}
          onConfirmLoading={removeLoading}
          text="Are you sure you want to delete the selected items?"
        />
      </AuthGuard>
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
                await mutate();
                toast.success('The comment moved to trash.', {
                  className: 'bg-success text-light text-sm',
                });
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
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Trash',
                onClick: () => router.push('/admin/comments/trash'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE],
              },
            ],
          }}
          columns={[
            {
              title: 'Content',
              search: {
                initialValue: router.query['searchBy.content'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.content'];
                  else router.query['searchBy.content'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.content'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.content'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.content'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Post',
              filter: {
                textInput: {
                  placeholder: 'Post Title',
                  onFilter: (value) => {
                    if (!value) delete router.query['filterBy.postTitle'];
                    else router.query['filterBy.postTitle'] = value;
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.postTitle'];
                    router.push(router);
                  },
                },
              },
            },
            {
              title: <MiniLike />,
              filter: {
                textInput: {
                  placeholder: '>=',
                  onFilter: (value) => {
                    if (!value) delete router.query['filterBy.likesNumGte'];
                    else router.query['filterBy.likesNumGte'] = value;
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.likesNumGte'];
                    router.push(router);
                  },
                },
              },
              sort: {
                initialValue: router.query['orderBy.likesNum'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.likesNum'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.likesNum'];
                  router.push(router);
                },
              },
            },
            {
              title: <MiniDislike />,
              filter: {
                textInput: {
                  placeholder: '>=',
                  onFilter: (value) => {
                    if (!value) delete router.query['filterBy.dislikesNumGte'];
                    else router.query['filterBy.dislikesNumGte'] = value;
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.dislikesNumGte'];
                    router.push(router);
                  },
                },
              },
              sort: {
                initialValue: router.query['orderBy.dislikesNum'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.dislikesNum'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.dislikesNum'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Approved',
              filter: {
                toggle: {
                  initialValue: !!router.query['filterBy.isApproved'],
                  onFilter: (value) => {
                    console.log(value);
                    router.query['filterBy.isApproved'] = value.toString();
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.isApproved'];
                    router.push(router);
                  },
                },
              },
              sort: {
                initialValue: router.query['orderBy.isApproved'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.isApproved'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.isApproved'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Seen',
              filter: {
                toggle: {
                  onFilter: (value) => {
                    if (!value) delete router.query['filterBy.seen'];
                    else router.query['filterBy.seen'] = value.toString();
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.seen'];
                    router.push(router);
                  },
                },
              },
              sort: {
                initialValue: router.query['orderBy.seen'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.seen'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.seen'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!commentsData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/comments`,
            currentPage: router.query.page
              ? +router.query.page
              : commentsData?.meta.currentPage,
            totalPages: commentsData?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminComments;
