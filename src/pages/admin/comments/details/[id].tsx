import { NextPage } from 'next';
import React from 'react';
import CommentDetails from '../../../../components/admin/comments/sub-components/CommentDetails';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const CommentDetailsPage: NextPage = () => {
  return (
    <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_READ]}>
      <AdminLayout
        pageTitle="Comment Details"
        breadCrumbs={[
          { label: 'Comments', href: '/admin/comments' },
          { label: 'Comments Details' },
        ]}
      >
        <CommentDetails />
      </AdminLayout>
    </AuthGuard>
  );
};

export default CommentDetailsPage;
