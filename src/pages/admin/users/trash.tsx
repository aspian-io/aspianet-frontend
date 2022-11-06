import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminUsersTrash from '../../../components/admin/users/AdminUsersTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const UsersTrashPage: NextPage = (props) => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_DELETE]}>
      <AdminLayout
        pageTitle="Users Trash"
        breadCrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: 'Trash' },
        ]}
      >
        <AdminUsersTrash />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersTrashPage;
