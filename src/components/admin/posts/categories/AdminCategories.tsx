import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminTaxonomyAgent } from '../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../models/auth/common';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import {
  ITaxonomyEntity,
  TaxonomyCreateFormValues,
  TaxonomyEditFormValues,
} from '../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../common/AuthGuard';
import Button from '../../../common/Button';
import ConfirmModal from '../../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../../common/table/AdminTable';
import AddCategoryForm from './sub-components/AddCategoryForm';
import CategoryDetails from './sub-components/CategoryDetails';
import EditCategoryForm from './sub-components/EditCategoryForm';
import { getCategoryById } from './sub-components/helpers';

interface IDataType extends ITableDataType {
  name: string;
  description: string;
  slug: string;
  actions: JSX.Element;
}

const AdminCategories = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [parent, setParent] = useState<ITaxonomyEntity | undefined>(undefined);
  const [detailsModal, setDetailsModal] = useState<{
    show: boolean;
    category?: ITaxonomyEntity;
  }>({ show: false, category: undefined });
  const [addCategoryModalShow, setAddCategoryModalShow] = useState(false);
  const [editCategoryModalShow, setEditCategoryModalShow] = useState(false);
  const [categoryIdToEdit, setCategoryIdToEdit] = useState<string | undefined>(
    undefined
  );
  const [categoryParentId, setCategoryParentId] = useState<string | undefined>(
    undefined
  );
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
    AdminTaxonomyAgent.categoriesList(session, `${qs}${initialSort()}`);

  const {
    data: categoriesData,
    error,
    mutate,
  } = useSWR<IPaginated<ITaxonomyEntity>, AxiosError<INestError>>(
    router.asPath,
    fetcher
  );

  if (error) router.push('/500');

  const actionsColumn = useCallback(
    (id: string, childLevel: number = 0) => (
      <div className="flex justify-center items-center w-full space-x-2 py-1">
        <Button
          rounded="rounded-md"
          size="h-5"
          type="button"
          variant="primary"
          extraCSSClasses="px-1.5 text-xs"
          onClick={() => {
            const category = getCategoryById(id, categoriesData?.items!);
            setDetailsModal({ show: true, category });
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
        {childLevel < +process.env.NEXT_PUBLIC_CATEGORY_CHILD_LEVEL! && (
          <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE]}>
            <Button
              rounded="rounded-md"
              size="h-5"
              type="button"
              variant="success"
              extraCSSClasses="px-1.5 text-xs"
              onClick={() => {
                setParent(getCategoryById(id, categoriesData?.items!));
                setCategoryParentId(id);
                setAddCategoryModalShow(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3 h-3 -rotate-90"
              >
                <path
                  fillRule="evenodd"
                  d="M2.232 12.207a.75.75 0 011.06.025l3.958 4.146V6.375a5.375 5.375 0 0110.75 0V9.25a.75.75 0 01-1.5 0V6.375a3.875 3.875 0 00-7.75 0v10.003l3.957-4.146a.75.75 0 011.085 1.036l-5.25 5.5a.75.75 0 01-1.085 0l-5.25-5.5a.75.75 0 01.025-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </AuthGuard>
        )}
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_EDIT]}>
          <Button
            rounded="rounded-md"
            size="h-5"
            type="button"
            variant="warning"
            extraCSSClasses="px-1.5 text-xs"
            onClick={() => {
              setCategoryIdToEdit(id);
              setEditCategoryModalShow(true);
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
        <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}>
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
    [categoriesData?.items]
  );

  const formatData = useCallback(
    (category: ITaxonomyEntity): IDataType => {
      return {
        id: category.id,
        name: category.term,
        description: category.description ?? '',
        slug: category.slug,
        children:
          category.children && category.children.length > 0
            ? category.children.map((ch) => formatData(ch))
            : [],
        actions: actionsColumn(category.id, category.childLevel),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () =>
      categoriesData ? categoriesData.items.map((c) => formatData(c)) : [],
    [categoriesData, formatData]
  );

  return (
    <>
      <AuthGuard
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}
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
                await AdminTaxonomyAgent.softDeleteAll(
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
        claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}
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
                await AdminTaxonomyAgent.softDelete(session, itemToDelete);
                await mutate();
                toast.success('The category moved to trash.', {
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
          text="Are you sure you want to delete the category?"
        />
      </AuthGuard>
      <CategoryDetails
        category={detailsModal.category}
        show={detailsModal.show}
        onClose={() => setDetailsModal({ show: false, category: undefined })}
        onDeleteSlugHistorySuccess={async (deletedItem) => {
          await mutate();
        }}
      />
      <AddCategoryForm
        addCategoryModalShow={addCategoryModalShow}
        newCategoryParentId={categoryParentId}
        parent={parent}
        onSuccess={async () => {
          await mutate();
          setCategoryParentId(undefined);
          setAddCategoryModalShow(false);
        }}
        onClose={() => {
          setAddCategoryModalShow(false);
          setCategoryParentId(undefined);
        }}
      />
      <EditCategoryForm
        initialValues={
          new TaxonomyEditFormValues(
            getCategoryById(
              categoryIdToEdit!,
              categoriesData?.items!
            ) as TaxonomyCreateFormValues
          )
        }
        categoryIdToEdit={categoryIdToEdit!}
        categoryParentId={categoryParentId}
        editCategoryModalShow={editCategoryModalShow}
        parent={parent}
        onSuccess={async () => {
          await mutate();
          setCategoryIdToEdit(undefined);
          setEditCategoryModalShow(false);
        }}
        onClose={() => {
          setEditCategoryModalShow(false);
        }}
      />
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Add',
                onClick: () => setAddCategoryModalShow(true),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE],
              },
              {
                value: 'Trash',
                onClick: () => router.push('/admin/posts/categories/trash'),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE],
              },
            ],
          }}
          columns={[
            {
              title: 'Name',
              search: {
                initialValue: router.query['searchBy.term'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.term'];
                  else router.query['searchBy.term'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.term'] as 'ASC' | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.term'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.term'];
                  router.push(router);
                },
              },
            },
            {
              title: 'Description',
              search: {
                initialValue: router.query['searchBy.description'] as string,
                onSubmit: (s) => {
                  if (!s?.length) delete router.query['searchBy.description'];
                  else router.query['searchBy.description'] = s;
                  router.push(router);
                },
              },
              sort: {
                initialValue: router.query['orderBy.description'] as
                  | 'ASC'
                  | 'DESC',
                onSortChange: (sort) => {
                  router.query['orderBy.description'] = sort;
                  router.push(router);
                },
                onReset: () => {
                  delete router.query['orderBy.description'];
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
              title: 'Actions',
            },
          ]}
          data={data}
          showChildren
          loading={!categoriesData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
          pagination={{
            baseUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/posts/categories`,
            currentPage: router.query.page
              ? +router.query.page
              : categoriesData?.meta.currentPage,
            totalPages: categoriesData?.meta.totalPages,
          }}
        />
      </div>
    </>
  );
};

export default AdminCategories;
