import { NextPage } from 'next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';

const AdminPage: NextPage = (props) => {
  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout
          pageTitle="Dashboard"
          breadCrumbs={[{ label: 'Dashboard' }]}
        >
          <div></div>
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AdminPage;
