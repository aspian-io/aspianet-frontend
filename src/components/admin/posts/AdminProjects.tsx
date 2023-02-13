import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminPostAgent } from '../../../lib/axios/agent';
import { AdminPostKeys } from '../../../lib/swr/keys';
import { ClaimsEnum } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import {
  IPostEntity,
  PostVisibilityEnum,
} from '../../../models/posts/admin/post';
import { TaxonomyTypeEnum } from '../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../common/AuthGuard';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import MiniEye from '../../common/vectors/mini/MiniEye';
import MiniLike from '../../common/vectors/mini/MiniLike';
import AdminTable, { ITableDataType } from '../common/table/AdminTable';

interface IDataType extends ITableDataType {
  title: string | JSX.Element;
  categories: string | JSX.Element;
  projectOwner?: string;
  slug: string;
  viewCount?: number;
  likesNum: number;
  actions: JSX.Element;
}

const AdminProjects = () => {
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

  const fetcher = () =>
    AdminPostAgent.projectsList(session, `${qs}${initialSort()}`);

  const {
    data: projectsData,
    error,
    mutate,
  } = useSWR<IPaginated<IPostEntity>, AxiosError<INestError>>(
    `${AdminPostKeys.GET_PROJECTS_LIST}${qs}${initialSort()}`,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = useCallback(
    (id: string, slug: string) => (
      <div className="flex justify-center items-center w-full space-x-2 py-1">
        <Link
          href={`/projects/${slug}`}
          className="bg-primary text-light py-1 px-1.5 rounded-md"
          target="_blank"
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
        </Link>
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_EDIT]}>
          <Button
            rounded="rounded-md"
            size="h-5"
            type="button"
            variant="warning"
            extraCSSClasses="px-1.5 text-xs"
            onClick={() => {
              router.push(`/admin/posts/edit/${id}`);
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
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
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
    (project: IPostEntity): IDataType => {
      return {
        id: project.id,
        title: (
          <div className="flex flex-col space-y-1">
            <div className="flex justify-start items-center">
              {project.visibility === PostVisibilityEnum.PRIVATE && (
                <div className="w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3.5 h-3.5 mr-1 text-primary mb-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {project.title}
            </div>
            <div className="flex justify-start items-center text-xs space-x-1">
              <div className="bg-primary-light rounded text-light px-1">
                Status: {project.status}
              </div>
              {project.isPinned && (
                <div className="bg-primary-light rounded text-light px-1">
                  Pinned
                </div>
              )}
            </div>
          </div>
        ),
        categories: (
          <div className="flex flex-wrap justify-start items-center">
            {project.taxonomies &&
              project.taxonomies.length > 0 &&
              project.taxonomies.map(
                (t, i) =>
                  t.type === TaxonomyTypeEnum.PROJECT_CATEGORY && (
                    <div
                      className="border-primary border-2 px-2 rounded-md text-primary mx-0.5 my-0.5"
                      key={i}
                    >
                      {t.term}
                    </div>
                  )
              )}
          </div>
        ),
        projectOwner: project.projectOwner?.email,
        slug: project.slug,
        viewCount: project.viewCount,
        likesNum: project.likesNum,
        actions: actionsColumn(project.id, project.slug),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () => (projectsData ? projectsData.items.map((p) => formatData(p)) : []),
    [formatData, projectsData]
  );

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}
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
                await AdminPostAgent.softDeleteAll(session, itemsToBulkDelete);
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
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}
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
                await AdminPostAgent.softDelete(session, itemToDelete);
                await mutate();
                toast.success('The project moved to trash.', {
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
          text="Are you sure you want to delete the project?"
        />
      </AuthGuard>
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Add',
                onClick: () => router.push('/admin/posts/add-project'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE],
              },
              {
                value: 'Trash',
                onClick: () => router.push('/admin/posts/projects-trash'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE],
              },
            ],
          }}
          columns={[
            {
              title: 'Title',
              search: {
                initialValue: router.query['searchBy.title'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.title'];
                  else router.query['searchBy.title'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.title'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.title'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.title'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Categories',
              search: {
                initialValue: router.query['searchBy.category'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.category'];
                  else router.query['searchBy.category'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: 'Owner',
              search: {
                initialValue: router.query['searchBy.projectOwner'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.projectOwner'];
                  else router.query['searchBy.projectOwner'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: 'Slug',
              search: {
                initialValue: router.query['searchBy.slug'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.slug'];
                  else router.query['searchBy.slug'] = s;
                  router.push(router);
                },
              },
            },
            {
              title: <MiniEye />,
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
              title: 'Actions',
            },
          ]}
          data={data}
          loading={!projectsData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/posts/projects`,
            currentPage: router.query.page
              ? +router.query.page
              : projectsData?.meta.currentPage,
            totalPages: projectsData?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminProjects;
