import { NextPage } from 'next';
import React from 'react';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminUserDetails from '../../../../components/admin/users/AdminUserDetails';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const UsersDetailsPage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_READ]}>
      <AdminLayout
        pageTitle="User Details"
        breadCrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: 'User Details' },
        ]}
      >
        <AdminUserDetails />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersDetailsPage;
