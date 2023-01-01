import { AxiosError } from 'axios';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import {
  AdminEmailAgent,
  AdminNewsletterAgent,
} from '../../../lib/axios/agent';
import { AdminEmailKeys, AdminNewsletterKeys } from '../../../lib/swr/keys';
import { ClaimsEnum } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { IEmailEntity } from '../../../models/emails/email';
import { ICampaignEntity } from '../../../models/newsletter/admin/campaign';
import { AuthGuard } from '../../common/AuthGuard';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  from: string;
  to: string;
  subject: string;
  actions: JSX.Element;
}

const AdminSentEmails = () => {
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
    ? decodeURIComponent(`?${router.asPath.split('?', 2)[1]}`)
    : '';

  const initialSort = () => {
    if (!router.query['orderBy.createdAt']) {
      return qs ? '&orderBy.createdAt=DESC' : '?orderBy.createdAt=DESC';
    }
    return '';
  };

  const fetcher = () =>
    AdminEmailAgent.listSentEmails(session, `${qs}${initialSort()}`);

  const {
    data: emailsData,
    error,
    mutate,
  } = useSWR<IPaginated<IEmailEntity>, AxiosError<INestError>>(
    `${AdminEmailKeys.GET_SENT_EMAILS_LIST}${qs}${initialSort()}`,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = useCallback(
    (id: string) => (
      <div className="flex justify-center items-center w-full space-x-2 py-1">
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_DELETE]}>
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

  const formatData = useCallback(
    (email: IEmailEntity): IDataType => {
      return {
        id: email.id,
        from: email.from,
        to: email.to,
        subject: email.subject,
        actions: actionsColumn(email.id),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () => (emailsData ? emailsData.items.map((p) => formatData(p)) : []),
    [formatData, emailsData]
  );

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_DELETE]}
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
              console.log(itemsToBulkDelete);
              if (itemsToBulkDelete && itemsToBulkDelete.length > 0) {
                await AdminEmailAgent.permanentDeleteAll(
                  session,
                  itemsToBulkDelete
                );
                setItemsToBulkDelete(null);
                await mutate();
                toast.success('The selected items deleted successfully.', {
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
          text="Are you sure you want to delete the selected items permanently?"
        />
      </AuthGuard>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_DELETE]}
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
                await AdminEmailAgent.deletePermanently(session, itemToDelete);
                await mutate();
                toast.success('The sent email deleted successfully.', {
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
          text="Are you sure you want to delete the sent email permanently?"
        />
      </AuthGuard>
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          columns={[
            {
              title: 'from',
              search: {
                initialValue: router.query['searchBy.from'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.from'];
                  else router.query['searchBy.from'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: 'To',
              search: {
                initialValue: router.query['searchBy.to'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.to'];
                  else router.query['searchBy.to'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: 'Subject',
              search: {
                initialValue: router.query['searchBy.subject'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.subject'];
                  else router.query['searchBy.subject'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!emailsData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/emails/sent`,
            currentPage: router.query.page
              ? +router.query.page
              : emailsData?.meta.currentPage,
            totalPages: emailsData?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminSentEmails;
