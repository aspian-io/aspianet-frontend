import React from 'react';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminUsersSettings from '../../../../components/admin/users/AdminUsersSettings';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const UsersSettingsPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Users Settings"
        breadCrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: 'Settings' },
        ]}
      >
        <AdminUsersSettings />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersSettingsPage;
