import { NextPage } from 'next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import AdminProfile from '../../components/admin/profile/AdminProfile';
import AdminSecurity from '../../components/admin/profile/AdminSecurity';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';

const SecurityPage: NextPage = (props) => {
  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout>
          <AdminSecurity />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default SecurityPage;
