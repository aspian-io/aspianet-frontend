import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { IUserEntity } from '../../../models/users/admin/user';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  email: string;
  firstName: string;
  lastName: string;
  mobilePhone: string | null;
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

  const actionsColumn = (id: string) => (
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
      <Button
        rounded="rounded-md"
        size="h-5"
        type="button"
        variant="warning"
        extraCSSClasses="px-1.5 text-xs"
        onClick={() => {
          router.push(`users/edit/${id}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
        </svg>
      </Button>
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
    </div>
  );

  const data: IDataType[] = users
    ? users.items.map((user) => ({
        rowId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobilePhone: user.mobilePhone,
        actions: actionsColumn(user.id),
      }))
    : [];

  return (
    <>
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
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          selectable={false}
          columns={[
            {
              title: 'Email',
              search: {
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.email'];
                  else router.query['searchBy.email'] = s;
                  router.push(router);
                },
              },
              sort: {
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
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.firstName'];
                  else router.query['searchBy.firstName'] = s;
                  router.push(router);
                },
              },
              sort: {
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
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.lastName'];
                  else router.query['searchBy.lastName'] = s;
                  router.push(router);
                },
              },
              sort: {
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
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.mobilePhone'];
                  else router.query['searchBy.mobilePhone'] = s;
                  router.push(router);
                },
              },
              sort: {
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
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!users}
          trashBtnOnClick={() => {}}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/users`,
            currentPage: users?.meta.currentPage,
            totalPages: users?.meta.totalPages,
            onSubmit: () => {},
            onItemsPerPageChange: () => {},
          }}
          onSelectColumns={(selectedIds) => {
            console.log('Selected Ids are: ', selectedIds);
          }}
        />
      </div>
    </>
  );
};

export default AdminUsers;
