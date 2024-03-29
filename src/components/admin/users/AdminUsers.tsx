import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { ClaimsEnum } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { IUserEntity } from '../../../models/users/admin/user';
import { AuthGuard } from '../../common/AuthGuard';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string | null;
  organizationMember: JSX.Element;
  actions: JSX.Element;
}

const AdminUsers = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const fetcher = () => AdminUserAgent.list(session, router.asPath);
  const {
    data: users,
    error,
    mutate,
  } = useSWR<IPaginated<IUserEntity>, AxiosError<INestError>>(
    router.asPath,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = useCallback(
    (id: string) => (
      <div className="flex justify-center items-center w-full space-x-2">
        <Button
          rounded="rounded-md"
          size="h-5"
          type="button"
          variant="primary"
          extraCSSClasses="px-1.5 text-xs"
          onClick={() => {
            router.push(`users/details/${id}`);
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
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_DELETE]}>
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

  const data: IDataType[] = useMemo(
    () =>
      users
        ? users.items.map((user) => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobilePhone: user.mobilePhone,
            organizationMember: boolIcons(user.organizationMember),
            actions: actionsColumn(user.id),
          }))
        : [],
    [actionsColumn, users]
  );

  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_DELETE]}>
        <ConfirmModal
          onCancel={() => {
            setRemoveConfirm(false);
            setItemToDelete(null);
          }}
          onConfirm={async () => {
            try {
              if (itemToDelete && itemToDelete === session?.user.id) {
                setRemoveLoading(false);
                setRemoveConfirm(false);
                return toast.error('You cannot delete current user!', {
                  className: 'bg-danger text-light text-sm',
                });
              }
              setRemoveLoading(true);
              if (itemToDelete) {
                await AdminUserAgent.softDelete(session, itemToDelete);
                await mutate();
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
          text="Are you sure you want to delete the user?"
        />
      </AuthGuard>
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Add',
                onClick: () => router.push('/admin/users/add-new'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.USER_CREATE],
              },
              {
                value: 'Trash',
                onClick: () => router.push('/admin/users/trash'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.USER_DELETE],
              },
            ],
          }}
          selectable={false}
          columns={[
            {
              title: 'Email',
              search: {
                initialValue: router.query['searchBy.email'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.email'];
                  else router.query['searchBy.email'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.email'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.email'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.email'];
                  router.push(router);
                },
              },
            },
            {
              title: 'First Name',
              search: {
                initialValue: router.query['searchBy.firstName'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.firstName'];
                  else router.query['searchBy.firstName'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.firstName'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.firstName'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.firstName'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Last Name',
              search: {
                initialValue: router.query['searchBy.lastName'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.lastName'];
                  else router.query['searchBy.lastName'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.lastName'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.lastName'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.lastName'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Mobile Phone',
              search: {
                initialValue: router.query['searchBy.mobilePhone'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.mobilePhone'];
                  else router.query['searchBy.mobilePhone'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.mobilePhone'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.mobilePhone'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.mobilePhone'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Org. Member',
              sort: {
                initialValue: router.query['orderBy.organizationMember'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.organizationMember'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.organizationMember'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!users}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/users`,
            currentPage: router.query.page
              ? +router.query.page
              : users?.meta.currentPage,
            totalPages: users?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminUsers;
