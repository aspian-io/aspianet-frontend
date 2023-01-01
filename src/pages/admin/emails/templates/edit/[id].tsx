import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import AdminEmailTemplateForm from '../../../../../components/admin/emails/templates/AdminEmailTemplateForm';
import AdminLayout from '../../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../../components/common/AuthGuard';
import { AdminPostAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { IPostEntity } from '../../../../../models/posts/admin/post';
import { authOptions } from '../../../../api/auth/[...nextauth]';

interface IProps {
  id: string;
  template: IPostEntity;
}

const EmailTemplatesEditPage: NextPage<IProps> = ({ id, template }) => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_EDIT]}>
      <AdminLayout
        pageTitle="Edit Template"
        breadCrumbs={[
          { label: 'Email' },
          { label: 'Templates', href: '/admin/email/templates' },
          { label: 'Edit' },
        ]}
      >
        <AdminEmailTemplateForm
          editTemplateId={id}
          editTemplateData={template}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default EmailTemplatesEditPage;

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
      const template = await AdminPostAgent.details(session, id);

      return {
        props: {
          id,
          template,
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
