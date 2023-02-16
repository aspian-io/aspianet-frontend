import { NextPage } from 'next';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import AdminNewsletterVerificationAddTemplate from '../../../../../components/admin/newsletter/templates/verification/AdminNewsletterVerificationAddTemplate';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { SettingsKeyEnum } from '../../../../../models/settings/settings';

const NewsletterAddUnsubscribeVerificationTemplatePage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Add Template"
        breadCrumbs={[
          { label: 'Newsletter' },
          { label: 'Settings', href: '/admin/newsletter/settings' },
          { label: 'Unsubscribe Verification Email Template' },
        ]}
      >
        <AdminNewsletterVerificationAddTemplate
          settingKey={SettingsKeyEnum.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default NewsletterAddUnsubscribeVerificationTemplatePage;
