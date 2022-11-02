import { NextPage } from 'next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import AdminSecurity from '../../components/admin/profile/AdminSecurity';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';

const SecurityPage: NextPage = (props) => {
  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout
          pageTitle="Admin"
          breadCrumbs={[{ label: 'Admin' }, { label: 'Security' }]}
        >
          <AdminSecurity />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default SecurityPage;
