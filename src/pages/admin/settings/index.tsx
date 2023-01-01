import { NextPage } from 'next';
import AdminSettings from '../../../components/admin/settings/AdminSettings';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const AdminSettingsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN]}>
        <AdminLayout pageTitle="Settings" breadCrumbs={[{ label: 'Settings' }]}>
          <AdminSettings />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AdminSettingsPage;
