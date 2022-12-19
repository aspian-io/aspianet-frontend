import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminBanners from '../../../components/admin/posts/AdminBanners';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const BannersPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Banners"
          breadCrumbs={[{ label: 'Posts' }, { label: 'All Banners' }]}
        >
          <AdminBanners />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default BannersPage;
