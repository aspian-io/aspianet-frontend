import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import AdminAddNewPost from '../../../components/admin/posts/AdminAddNewPost';

const PostsAddNewPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Post"
          breadCrumbs={[{ label: 'Posts' }, { label: 'Add New' }]}
        >
          <AdminAddNewPost />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsAddNewPage;
