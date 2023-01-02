import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminMenuItems from '../../../../../components/admin/appearance/menus/AdminMenuItems';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../models/auth/common';

const AppearanceMenuItemsPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <AuthGuard
        claims={[
          ClaimsEnum.ADMIN,
          ClaimsEnum.TAXONOMY_CREATE,
          ClaimsEnum.TAXONOMY_EDIT,
        ]}
      >
        <AdminLayout
          pageTitle="Menu Items"
          breadCrumbs={[
            { label: 'Appearance' },
            { label: 'Menus', href: '/admin/appearance/menus' },
            { label: 'Items' },
          ]}
          topBarBackArrow={false}
        >
          <AdminMenuItems menuId={id} />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AppearanceMenuItemsPage;
