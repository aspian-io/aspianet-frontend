import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminContactResponseAddTemplate from '../../../../components/admin/settings/sub-components/AdminContactResponseAddTemplate';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const UsersAddVerificationTemplatePage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Add Contact Response Template"
        breadCrumbs={[
          { label: 'Settings' },
          { label: 'Change Contact Auto Response Template' },
        ]}
      >
        <AdminContactResponseAddTemplate />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersAddVerificationTemplatePage;
