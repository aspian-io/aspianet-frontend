import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminMediaSettings from '../../../components/admin/media/AdminMediaSettings';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const MediaSettingsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN]}>
        <AdminLayout
          pageTitle="Media Settings"
          breadCrumbs={[{ label: 'Media' }, { label: 'Settings' }]}
        >
          <AdminMediaSettings />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default MediaSettingsPage;
