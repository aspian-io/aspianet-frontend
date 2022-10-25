import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const UsersPage: NextPage = (props) => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_READ]}>
        <AdminLayout></AdminLayout>
      </AuthGuard>
    </>
  );
};

export default UsersPage;
