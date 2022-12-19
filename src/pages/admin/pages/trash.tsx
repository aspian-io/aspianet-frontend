import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPagesTrash from '../../../components/admin/pages/AdminPagesTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const PagesTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Pages Trash"
          breadCrumbs={[
            { label: 'Pages', href: '/admin/pages' },
            { label: 'Trash' },
          ]}
        >
          <AdminPagesTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PagesTrashPage;
