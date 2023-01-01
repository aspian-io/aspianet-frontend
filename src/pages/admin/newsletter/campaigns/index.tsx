import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminCampaigns from '../../../../components/admin/newsletter/campaigns/AdminCampaigns';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterCampaignsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_READ]}>
        <AdminLayout
          pageTitle="All Campaigns"
          breadCrumbs={[{ label: 'Newsletter' }, { label: 'Campaigns' }]}
          topBarBackArrow={false}
        >
          <AdminCampaigns />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterCampaignsPage;
