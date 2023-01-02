import { NextPage } from 'next';
import AdminMenus from '../../../../components/admin/appearance/menus/AdminMenus';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const AppearanceMenusPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_READ]}>
        <AdminLayout
          pageTitle="Menus"
          breadCrumbs={[{ label: 'Appearance' }, { label: 'Menus' }]}
          topBarBackArrow={false}
        >
          <AdminMenus />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AppearanceMenusPage;
