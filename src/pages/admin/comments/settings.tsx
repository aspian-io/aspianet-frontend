import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import AdminCommentsSettings from '../../../components/admin/comments/AdminCommentsSettings';

const CommentsSettingsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN]}>
        <AdminLayout
          pageTitle="Comments Settings"
          breadCrumbs={[
            { label: 'Comments', href: '/admin/comments' },
            { label: 'Settings' },
          ]}
        >
          <AdminCommentsSettings />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default CommentsSettingsPage;
