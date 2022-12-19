import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminNewsTrash from '../../../components/admin/posts/AdminNewsTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const PostsNewsTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="News Trash"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'News Trash' },
          ]}
        >
          <AdminNewsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsNewsTrashPage;
