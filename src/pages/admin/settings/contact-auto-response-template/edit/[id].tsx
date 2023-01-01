import { NextPage } from 'next';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import AdminContactResponseEditTemplate from '../../../../../components/admin/settings/sub-components/AdminContactResponseEditTemplate';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../models/auth/common';

const UsersEditVerificationTemplatePage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Edit Contact Response Template"
        breadCrumbs={[
          { label: 'Settings' },
          { label: 'Change Contact Auto Response Template' },
        ]}
      >
        <AdminContactResponseEditTemplate />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersEditVerificationTemplatePage;
