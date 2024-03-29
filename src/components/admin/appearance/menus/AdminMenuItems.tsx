import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import {
  AdminPostAgent,
  AdminSettingsAgent,
  AdminTaxonomyAgent,
} from '../../../../lib/axios/agent';
import { AdminTaxonomyKeys } from '../../../../lib/swr/keys';
import { ClaimsEnum } from '../../../../models/auth/common';
import { INestError } from '../../../../models/common/error';
import {
  ISettingsEntity,
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../../models/settings/settings';
import {
  ITaxonomyEntity,
  TaxonomyCreateFormValues,
  TaxonomyEditFormValues,
} from '../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../common/AuthGuard';
import Button from '../../../common/Button';
import ConfirmModal from '../../../common/ConfirmModal';
import AdminTable, { ITableDataType } from '../../common/table/AdminTable';
import { swrMenuSettingsKey } from './constants';
import AddMenuItemForm from './sub-components/AddMenuItemForm';
import EditMenuItemForm from './sub-components/EditMenuItemForm';
import MenuItemDetails from './sub-components/MenuItemDetails';

interface IProps {
  menuId: string;
}

interface IDataType extends ITableDataType {
  name: string;
  description: string;
  actions: JSX.Element;
}

const AdminMenuItems: FC<IProps> = ({ menuId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [parent, setParent] = useState<ITaxonomyEntity | undefined>(undefined);
  const [detailsModal, setDetailsModal] = useState<{
    show: boolean;
    menuItem?: ITaxonomyEntity;
  }>({ show: false, menuItem: undefined });
  const [addMenuItemModalShow, setAddMenuItemModalShow] = useState(false);
  const [editMenuItemModalShow, setEditMenuItemModalShow] = useState(false);
  const [menuItemToEdit, setMenuItemToEdit] = useState<
    ITaxonomyEntity | undefined
  >(undefined);
  const [menuItemParentId, setMenuItemParentId] = useState<string | undefined>(
    undefined
  );
  const [removeLoading, setRemoveLoading] = useState(false);

  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [bulkRemoveConfirm, setBulkRemoveConfirm] = useState(false);
  const [itemsToBulkDelete, setItemsToBulkDelete] = useState<string[] | null>(
    null
  );

  const fetcher = () => AdminTaxonomyAgent.menusItems(session, menuId);

  const {
    data: menuItemsData,
    error,
    mutate,
  } = useSWR<ITaxonomyEntity[], AxiosError<INestError>>(
    AdminTaxonomyKeys.GET_ALL_MENU_ITEMS,
    fetcher
  );

  if (error) router.push('/500');

  const settingFetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.MENU);

  const { data: menuSettingsData, error: settingError } = useSWR<
    ISettingsEntity[],
    AxiosError<INestError>
  >(swrMenuSettingsKey, settingFetcher);

  if (error) router.push('/500');

  const primaryMenuSetting = useMemo(
    () =>
      menuSettingsData?.filter(
        (s) => s.key === SettingsKeyEnum.MENU_PRIMARY
      )[0],
    [menuSettingsData]
  );
  const secondaryMenuSetting = useMemo(
    () =>
      menuSettingsData?.filter(
        (s) => s.key === SettingsKeyEnum.MENU_SECONDARY
      )[0],
    [menuSettingsData]
  );

  function isActiveMenu(menuId: string) {
    const activeMenuIds: string[] = [];
    if (
      primaryMenuSetting?.value &&
      !activeMenuIds.includes(primaryMenuSetting.value)
    ) {
      activeMenuIds.push(primaryMenuSetting.value);
    }
    if (
      secondaryMenuSetting?.value &&
      !activeMenuIds.includes(secondaryMenuSetting.value)
    ) {
      activeMenuIds.push(secondaryMenuSetting.value);
    }

    return activeMenuIds.includes(menuId);
  }

  const actionsColumn = useCallback(
    (menuItem: ITaxonomyEntity, childLevel: number = 0) => (
      <div className="flex justify-center items-center w-full space-x-2 py-1">
        <Button
          rounded="rounded-md"
          size="h-5"
          type="button"
          variant="primary"
          extraCSSClasses="px-1.5 text-xs"
          onClick={() => {
            setDetailsModal({ show: true, menuItem });
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
        {childLevel < +process.env.NEXT_PUBLIC_CATEGORY_CHILD_LEVEL! - 1 && (
          <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE]}>
            <Button
              rounded="rounded-md"
              size="h-5"
              type="button"
              variant="success"
              extraCSSClasses="px-1.5 text-xs"
              onClick={() => {
                setParent(menuItem);
                setMenuItemParentId(menuItem.id);
                setAddMenuItemModalShow(true);
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
              setMenuItemToEdit(menuItem);
              setEditMenuItemModalShow(true);
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
              setItemToDelete(menuItem.id);
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
    (category: ITaxonomyEntity): IDataType => {
      return {
        id: category.id,
        name: category.term,
        description: category.description ?? '',
        children:
          category.children && category.children.length > 0
            ? category.children.map((ch) => formatData(ch))
            : [],
        actions: actionsColumn(category, category.childLevel),
      };
    },
    [actionsColumn]
  );

  const data: IDataType[] = useMemo(
    () => (menuItemsData ? menuItemsData.map((c) => formatData(c)) : []),
    [menuItemsData, formatData]
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
                await AdminTaxonomyAgent.permanentDeleteAll(
                  session,
                  itemsToBulkDelete
                );
                if (itemsToBulkDelete.some((i) => isActiveMenu(i))) {
                  // Revalidate Home Page
                  await AdminPostAgent.revalidateHomePage(session);
                }
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
                await AdminTaxonomyAgent.deletePermanently(
                  session,
                  itemToDelete
                );
                
                if (isActiveMenu(itemToDelete)) {
                  // Revalidate Home Page
                  await AdminPostAgent.revalidateHomePage(session);
                }
                await mutate();
                toast.success('The menu item deleted successfully.', {
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
          text="Are you sure you want to delete the menu item permanently?"
        />
      </AuthGuard>
      <MenuItemDetails
        menuItem={detailsModal.menuItem}
        show={detailsModal.show}
        onClose={() => setDetailsModal({ show: false, menuItem: undefined })}
      />
      <AddMenuItemForm
        addMenuItemModalShow={addMenuItemModalShow}
        newMenuItemParentId={menuItemParentId ?? menuId}
        parent={parent}
        isActiveMenu={isActiveMenu(menuId)}
        onSuccess={async () => {
          await mutate();
          setMenuItemParentId(undefined);
          setAddMenuItemModalShow(false);
        }}
        onClose={() => {
          setAddMenuItemModalShow(false);
          setMenuItemParentId(undefined);
        }}
      />
      <EditMenuItemForm
        initialValues={
          new TaxonomyEditFormValues(
            menuItemToEdit! as TaxonomyCreateFormValues
          )
        }
        menuItemIdToEdit={menuItemToEdit?.id!}
        menuItemParentId={menuItemParentId ?? menuId}
        editMenuItemModalShow={editMenuItemModalShow}
        parent={parent}
        isActiveMenu={isActiveMenu(menuId)}
        onSuccess={async () => {
          await mutate();
          setMenuItemToEdit(undefined);
          setEditMenuItemModalShow(false);
        }}
        onClose={() => {
          setMenuItemToEdit(undefined);
          setEditMenuItemModalShow(false);
        }}
      />
      <div className="flex flex-col justify-center items-center pb-4 space-y-4">
        <AdminTable
          menu={{
            items: [
              {
                value: 'Add',
                onClick: () => setAddMenuItemModalShow(true),
                claims: [ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE],
              },
            ],
          }}
          columns={[
            {
              title: 'Label',
            },
            {
              title: 'Description',
            },
            {
              title: 'Actions',
            },
          ]}
          data={data}
          showChildren
          loading={!menuItemsData}
          onBulkDeleteButtonClick={() => setBulkRemoveConfirm(true)}
          onSelectColumns={(selectedIds) => setItemsToBulkDelete(selectedIds)}
        />
      </div>
    </>
  );
};

export default AdminMenuItems;
