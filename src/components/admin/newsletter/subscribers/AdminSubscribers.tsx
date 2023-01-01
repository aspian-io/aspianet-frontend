import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminNewsletterAgent } from '../../../../lib/axios/agent';
import { AdminNewsletterKeys } from '../../../../lib/swr/keys';
import { ClaimsEnum } from '../../../../models/auth/common';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import { ISubscriberEntity } from '../../../../models/newsletter/subscribers/admin/subscriber';
import { AuthGuard } from '../../../common/AuthGuard';
import Button from '../../../common/Button';
import ConfirmModal from '../../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../../common/table/AdminTable';
import AddSubscriberForm from './sub-components/AddSubscriberForm';
import EditSubscriberForm from './sub-components/EditSubscriberForm';
import SubscriberDetails from './sub-components/SubscriberDetails';

interface IDataType extends ITableDataType {
  name: string;
  email: string;
  approved: JSX.Element;
  actions: JSX.Element;
}

const AdminSubscribers = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [removeLoading, setRemoveLoading] = useState(false);

  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [bulkRemoveConfirm, setBulkRemoveConfirm] = useState(false);
  const [itemsToBulkDelete, setItemsToBulkDelete] = useState<string[] | null>(
    null
  );

  const [addSubscriberModalShow, setAddSubscriberModalShow] = useState(false);

  const [subscriberIdToEdit, setSubscriberIdToEdit] = useState<
    string | undefined
  >(undefined);
  const [editSubscriberModalShow, setEditSubscriberModalShow] = useState(false);

  const [subscriberDetailsId, setSubscriberDetailsId] = useState<
    string | undefined
  >(undefined);
  const [subscriberDetailsModalShow, setSubscriberDetailsModalShow] =
    useState(false);

  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : '';

  const initialSort = () => {
    if (!router.query['orderBy.createdAt']) {
      return qs ? '&orderBy.createdAt=DESC' : '?orderBy.createdAt=DESC';
    }
    return '';
  };

  const fetcher = () =>
    AdminNewsletterAgent.listSubscribers(session, `${qs}${initialSort()}`);

  const {
    data: subscribersData,
    error,
    mutate,
  } = useSWR<IPaginated<ISubscriberEntity>, AxiosError<INestError>>(
    `${AdminNewsletterKeys.GET_SUBSCRIBERS_LIST}${qs}${initialSort()}`,
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
            setSubscriberDetailsId(id);
            setSubscriberDetailsModalShow(true);
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
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_EDIT]}>
          <Button
            rounded="rounded-md"
            size="h-5"
            type="button"
            variant="warning"
            extraCSSClasses="px-1.5 text-xs"
            onClick={() => {
              setSubscriberIdToEdit(id);
              setEditSubscriberModalShow(true);
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
        </AuthGuard>
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE]}>
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
    []
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

  const formatData = useCallback(
    (subscriber: ISubscriberEntity): IDataType => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        email: subscriber.email,
        approved: boolIcons(subscriber.approved),
        actions: actionsColumn(subscriber.id),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () =>
      subscribersData ? subscribersData.items.map((p) => formatData(p)) : [],
    [formatData, subscribersData]
  );

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE]}
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
                await AdminNewsletterAgent.softDeleteSubscribersAll(
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
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE]}
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
                await AdminNewsletterAgent.softDeleteSubscriber(
                  session,
                  itemToDelete
                );
                await mutate();
                toast.success('The subscriber moved to trash.', {
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
          text="Are you sure you want to delete the subscriber?"
        />
      </AuthGuard>
      <SubscriberDetails
        show={subscriberDetailsModalShow}
        subscriberId={subscriberDetailsId}
        subscribers={subscribersData?.items}
        onClose={() => {
          setSubscriberDetailsId(undefined);
          setSubscriberDetailsModalShow(false);
        }}
      />
      <AddSubscriberForm
        addSubscriberModalShow={addSubscriberModalShow}
        onSuccess={async () => {
          await mutate();
          setAddSubscriberModalShow(false);
        }}
        onClose={() => {
          setAddSubscriberModalShow(false);
        }}
      />
      <EditSubscriberForm
        subscribers={subscribersData?.items ?? []}
        subscriberIdToEdit={subscriberIdToEdit!}
        editSubscriberModalShow={editSubscriberModalShow}
        onSuccess={async () => {
          await mutate();
          setSubscriberIdToEdit(undefined);
          setEditSubscriberModalShow(false);
        }}
        onClose={() => {
          setSubscriberIdToEdit(undefined);
          setEditSubscriberModalShow(false);
        }}
      />
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Add',
                onClick: () => setAddSubscriberModalShow(true),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_CREATE],
              },
              {
                value: 'Trash',
                onClick: () =>
                  router.push('/admin/newsletter/subscribers/trash'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE],
              },
            ],
          }}
          columns={[
            {
              title: 'Name',
              search: {
                initialValue: router.query['searchBy.name'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.name'];
                  else router.query['searchBy.name'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.name'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.name'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.name'];
                  router.push(router);
                },
              },
            },
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
              title: 'Approval',
              filter: {
                toggle: {
                  initialValue: !!router.query['filterBy.approved'],
                  onFilter: (value) => {
                    console.log(value);
                    router.query['filterBy.approved'] = value.toString();
                    router.push(router);
                  },
                  onReset: () => {
                    delete router.query['filterBy.approved'];
                    router.push(router);
                  },
                },
              },
              sort: {
                initialValue: router.query['orderBy.approved'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.approved'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.approved'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!subscribersData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/newsletter/subscribers`,
            currentPage: router.query.page
              ? +router.query.page
              : subscribersData?.meta.currentPage,
            totalPages: subscribersData?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminSubscribers;
