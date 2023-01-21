import { NextPage } from 'next';
import AdminMenus from '../../../../components/admin/appearance/menus/AdminMenus';
import AdminTemplate from '../../../../components/admin/appearance/template/AdminTemplate';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const AppearanceTemplatePage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="Template"
          breadCrumbs={[{ label: 'Appearance' }, { label: 'Template' }]}
          topBarBackArrow={false}
        >
          <AdminTemplate />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AppearanceTemplatePage;
