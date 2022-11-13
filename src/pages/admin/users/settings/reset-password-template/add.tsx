import { NextPage } from 'next';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import UsersVerificationAddTemplate from '../../../../../components/admin/users/sub-components/verification-template/UsersVerificationAddTemplate';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { SettingsKeyEnum } from '../../../../../models/settings/settings';

const UsersAddVerificationTemplatePage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Add Template"
        breadCrumbs={[
          { label: 'Users' },
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Reset Password Template' },
        ]}
      >
        <UsersVerificationAddTemplate
          settingKey={SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersAddVerificationTemplatePage;
