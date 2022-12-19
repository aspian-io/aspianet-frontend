import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminNews from '../../../components/admin/posts/AdminNews';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const NewsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All News"
          breadCrumbs={[{ label: 'Posts' }, { label: 'All News' }]}
        >
          <AdminNews />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsPage;
