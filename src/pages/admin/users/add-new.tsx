import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminUserCreate from '../../../components/admin/users/AdminUserCreate';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const AddNewUserPage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_CREATE]}>
      <AdminLayout
        pageTitle="Add New User"
        breadCrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: 'Add New' },
        ]}
      >
        <AdminUserCreate />
      </AdminLayout>
    </AuthGuard>
  );
};

export default AddNewUserPage;
