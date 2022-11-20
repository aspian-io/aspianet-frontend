import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminMedia from '../../../components/admin/media/AdminMedia';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const MediaLibraryPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.FILE_READ]}>
        <AdminLayout
          pageTitle="Media Library"
          breadCrumbs={[{ label: 'Media' }, { label: 'Library' }]}
        >
          <AdminMedia />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default MediaLibraryPage;
