import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';

const AdminPage: NextPage = (props) => {
  const { data: session } = useSession();

  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout>{session?.user.firstName}</AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AdminPage;
