import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminCampaignsTrash from '../../../../components/admin/newsletter/campaigns/AdminCampaignsTrash';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterCampaignsTrash: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE]}>
        <AdminLayout
          pageTitle="Campaigns Trash"
          breadCrumbs={[
            { label: 'Newsletter' },
            { label: 'Campaigns', href: '/admin/newsletter/campaigns' },
            { label: 'Trash' },
          ]}
        >
          <AdminCampaignsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterCampaignsTrash;
