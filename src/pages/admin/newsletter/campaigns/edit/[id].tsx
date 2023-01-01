import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import AdminCampaignForm from '../../../../../components/admin/newsletter/campaigns/AdminCampaignForm';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { AdminNewsletterAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { ICampaignEntity } from '../../../../../models/newsletter/admin/campaign';
import { authOptions } from '../../../../api/auth/[...nextauth]';

interface IProps {
  id: string;
  campaign: ICampaignEntity;
}

const NewsletterCampaignEditPage: NextPage<IProps> = ({ id, campaign }) => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_EDIT]}>
      <AdminLayout
        pageTitle="Edit Campaign"
        breadCrumbs={[
          { label: 'Newsletter' },
          { label: 'Campaigns', href: '/admin/newsletter/campaigns' },
          { label: 'Edit' },
        ]}
      >
        <AdminCampaignForm editId={id} editData={campaign} />
      </AdminLayout>
    </AuthGuard>
  );
};

export default NewsletterCampaignEditPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const id = context.params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }

  if (session) {
    try {
      const campaign = await AdminNewsletterAgent.campaignDetails(session, id);

      return {
        props: {
          id,
          campaign,
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }

  return {
    notFound: true,
  };
};
