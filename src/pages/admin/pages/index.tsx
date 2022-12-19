import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import AdminPages from '../../../components/admin/pages/AdminPages';

const PagesPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Pages"
          breadCrumbs={[{ label: 'Posts' }, { label: 'All Pages' }]}
        >
          <AdminPages />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PagesPage;
