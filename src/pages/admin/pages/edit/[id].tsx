import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { AdminPostAgent } from '../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../models/auth/common';
import { IPostEntity } from '../../../../models/posts/admin/post';
import { authOptions } from '../../../api/auth/[...nextauth]';

interface IProps {
  id: string;
  pageData: IPostEntity;
}

const PagesEditPage: NextPage<IProps> = ({ id, pageData }) => {
  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE, ClaimsEnum.POST_EDIT]}
    >
      <AdminLayout
        pageTitle="Edit Page"
        breadCrumbs={[
          { label: 'Pages', href: '/admin/pages' },
          { label: 'Edit' },
        ]}
      >
        <AdminPostForm
          postType={pageData.type}
          editPostId={id}
          editPostData={pageData}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default PagesEditPage;

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
      const pageData = await AdminPostAgent.details(session, id);

      return {
        props: {
          id,
          pageData,
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
