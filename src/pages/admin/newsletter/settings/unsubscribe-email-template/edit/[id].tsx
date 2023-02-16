import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../../../components/admin/layout/AdminLayout';
import AdminNewsletterVerificationEditTemplate from '../../../../../../components/admin/newsletter/templates/verification/AdminNewsletterVerificationEditTemplate';
import { AuthGuard } from '../../../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../../../models/auth/common';
import { SettingsKeyEnum } from '../../../../../../models/settings/settings';

const NewsletterEditUnsubscribeVerificationTemplatePage: NextPage = () => {
  const router = useRouter();
  const settingValue = router.query.id as string;

  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN]}>
      <AdminLayout
        pageTitle="Edit Template"
        breadCrumbs={[
          { label: 'Newsletter' },
          { label: 'Settings', href: '/admin/newsletter/settings' },
          { label: 'Unsubscribe Verification Email Template' },
        ]}
      >
        <AdminNewsletterVerificationEditTemplate
          settingKey={SettingsKeyEnum.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID}
          settingValue={settingValue}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default NewsletterEditUnsubscribeVerificationTemplatePage;
