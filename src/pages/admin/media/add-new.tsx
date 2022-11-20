import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminAddNewFile from '../../../components/admin/media/AdminAddNewFile';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const MediaAddNewPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.FILE_CREATE]}>
        <AdminLayout
          pageTitle="Add New File"
          breadCrumbs={[
            { label: 'Media', href: '/admin/media' },
            { label: 'Add New' },
          ]}
        >
          <AdminAddNewFile />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default MediaAddNewPage;
