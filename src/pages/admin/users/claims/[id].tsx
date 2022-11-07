import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminUserClaims from '../../../../components/admin/users/AdminUserClaims';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const UsersClaimsPage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="User Claims"
        breadCrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: 'User Claims' },
        ]}
      >
        <AdminUserClaims />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersClaimsPage;
