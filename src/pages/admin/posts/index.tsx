import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import AdminPosts from '../../../components/admin/posts/AdminPosts';

const PostsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Posts"
          breadCrumbs={[{ label: 'Posts' }, { label: 'All Posts' }]}
        >
          <AdminPosts />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsPage;
