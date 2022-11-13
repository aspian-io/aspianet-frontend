import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../../../components/admin/layout/AdminLayout';
import UsersVerificationEditTemplate from '../../../../../../components/admin/users/sub-components/verification-template/UsersVerificationEditTemplate';
import { AuthGuard } from '../../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../../models/auth/common';
import { SettingsKeyEnum } from '../../../../../../models/settings/settings';

const UsersEditVerificationTemplatePage: NextPage = () => {
  const router = useRouter();
  const settingValue = router.query.id as string;

  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Edit Template"
        breadCrumbs={[
          { label: 'Users' },
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Reset Password Template' },
        ]}
      >
        <UsersVerificationEditTemplate
          settingKey={SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID}
          settingValue={settingValue}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default UsersEditVerificationTemplatePage;
