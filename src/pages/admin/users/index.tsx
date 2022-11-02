import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminUsers from '../../../components/admin/users/AdminUsers';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const UsersPage: NextPage = (props) => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_READ]}>
        <AdminLayout
          pageTitle="All Users"
          breadCrumbs={[{ label: 'Users' }, { label: 'All Users' }]}
        >
          <AdminUsers />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default UsersPage;
