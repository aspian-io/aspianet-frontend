import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import AdminPosts from '../../../components/admin/posts/AdminPosts';
import AdminComments from '../../../components/admin/comments/AdminComments';

const CommentsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_READ]}>
        <AdminLayout
          pageTitle="All Comments"
          breadCrumbs={[{ label: 'Comments' }, { label: 'All Comments' }]}
        >
          <AdminComments />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default CommentsPage;
