import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminCampaignForm from '../../../../components/admin/newsletter/campaigns/AdminCampaignForm';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterCampaignAddNewPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_CREATE]}>
        <AdminLayout
          pageTitle="Add New Campaign"
          breadCrumbs={[
            { label: 'Newsletter' },
            { label: 'Campaigns', href: '/admin/newsletter/campaigns' },
            { label: 'Add New' },
          ]}
        >
          <AdminCampaignForm />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterCampaignAddNewPage;
