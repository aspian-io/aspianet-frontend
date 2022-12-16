import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import { PostTypeEnum } from '../../../models/posts/admin/post';

const PostsAddNewPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Post"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Add New' },
          ]}
        >
          <AdminPostForm postType={PostTypeEnum.BLOG} />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsAddNewPage;
