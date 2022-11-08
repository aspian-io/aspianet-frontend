import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { AdminUserKeys } from '../../../lib/swr/keys';
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

const AdminUsersTrash = () => {
  const router = useRouter();
  const page =
    router.query['page'] && +router.query['page'] >= 1
      ? +router.query['page']
      : 1;
  const limit =
    router.query['limit'] && +router.query['limit'] >= 10
      ? +router.query['limit']
      : 10;
  const { data: session } = useSession();
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [recoverLoading, setRecoverLoading] = useState(false);
  const [btnId, setBtnId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const fetcher = () =>
    AdminUserAgent.softDeletedUsersList(session, page, limit);
  const {
    data: users,
    error,
    mutate,
  } = useSWR<IPaginated<IUserEntity>, AxiosError<INestError>>(
    `${AdminUserKeys.GET_SOFT_DELETED_USERS}?page=${page}&limit=${limit}`,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = (id: string) => (
    <div className="flex justify-center items-center w-full space-x-2">
      <Button
        rounded="rounded-md"
        size="h-5"
        type="button"
        variant="success"
        extraCSSClasses="px-1.5 text-xs"
        disabled={recoverLoading}
        onClick={async () => {
          setBtnId(id);
          setRecoverLoading(true);
          try {
            await AdminUserAgent.recoverUser(session, id);
            await mutate();
            setRecoverLoading(false);
            toast.success('User recovered successfully.', {
              className: 'bg-success text-light text-sm',
            });
            setBtnId(null);
          } catch (error) {
            setRecoverLoading(false);
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
            setBtnId(null);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          id={id}
          className={`w-3 h-3 ${
            recoverLoading && btnId === id ? 'animate-spin' : ''
          }`}
        >
          <path
            fillRule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Button
        rounded="rounded-md"
        size="h-5"
        type="button"
        variant="danger"
        extraCSSClasses="px-1.5 text-xs"
        disabled={recoverLoading}
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
              await AdminUserAgent.deletePermanently(session, itemToDelete);
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
        text="Are you sure you want to delete the user permanently?"
      />
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          selectable={false}
          columns={[
            {
              title: 'Email',
            },
            {
              title: 'First Name',
            },
            {
              title: 'Last Name',
            },
            {
              title: 'Mobile Phone',
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!users}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/users`,
            currentPage: users?.meta.currentPage,
            totalPages: users?.meta.totalPages,
            onSubmit: () => {},
            onItemsPerPageChange: () => {},
          }}
        />
      </div>
    </>
  );
};

export default AdminUsersTrash;