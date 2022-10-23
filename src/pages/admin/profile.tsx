import { NextPage } from 'next';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import AdminProfile from '../../components/admin/profile/AdminProfile';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';

const ProfilePage: NextPage = (props) => {

  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout>
          <AdminProfile />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default ProfilePage;
