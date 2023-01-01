import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import AdminSentEmailDetails from '../../../../../components/admin/emails/AdminSentEmailDetails';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { AdminEmailAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { IEmailEntity } from '../../../../../models/emails/email';
import { authOptions } from '../../../../api/auth/[...nextauth]';

interface IProps {
  emailData: IEmailEntity;
}

const SentEmailDetailsPage: NextPage<IProps> = ({ emailData }) => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_READ]}>
      <AdminLayout
        pageTitle="Sent Email Details"
        breadCrumbs={[
          { label: 'Emails' },
          { label: 'Sent Emails', href: '/admin/emails/sent' },
          { label: 'Details' },
        ]}
      >
        <AdminSentEmailDetails emailData={emailData} />
      </AdminLayout>
    </AuthGuard>
  );
};

export default SentEmailDetailsPage;

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
      const emailData = await AdminEmailAgent.sentEmailDetails(session, id);

      return {
        props: {
          emailData,
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
