import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { AdminPostAgent } from '../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../models/auth/common';
import { IPostEntity, PostTypeEnum } from '../../../../models/posts/admin/post';
import { authOptions } from '../../../api/auth/[...nextauth]';

interface IProps {
  id: string;
  postData: IPostEntity;
}

const PostEditPage: NextPage<IProps> = ({ id, postData }) => {
  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE, ClaimsEnum.POST_EDIT]}
    >
      <AdminLayout
        pageTitle="Edit"
        breadCrumbs={[
          { label: 'Posts', href: '/admin/posts' },
          { label: 'Edit' },
        ]}
      >
        <AdminPostForm
          postType={postData.type}
          editPostId={id}
          editPostData={postData}
        />
      </AdminLayout>
    </AuthGuard>
  );
};

export default PostEditPage;

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
      const postData = await AdminPostAgent.details(session, id);

      return {
        props: {
          id,
          postData,
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
