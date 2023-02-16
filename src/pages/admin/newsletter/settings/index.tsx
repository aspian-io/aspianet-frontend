import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminNewsletterSettings from '../../../../components/admin/newsletter/AdminNewsletterSettings';

const NewsletterSettingsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN]}>
        <AdminLayout
          pageTitle="Newsletter Settings"
          breadCrumbs={[{ label: 'Newsletter' }, { label: 'Settings' }]}
          topBarBackArrow={false}
        >
          <AdminNewsletterSettings />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterSettingsPage;
