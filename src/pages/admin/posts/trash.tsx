import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostsTrash from '../../../components/admin/posts/AdminPostsTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const PostsTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Posts Trash"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Trash' },
          ]}
        >
          <AdminPostsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsTrashPage;
