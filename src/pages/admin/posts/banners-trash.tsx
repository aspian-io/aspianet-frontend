import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminBannersTrash from '../../../components/admin/posts/AdminBannersTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const PostsBannersTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Banners Trash"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Banners Trash' },
          ]}
        >
          <AdminBannersTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsBannersTrashPage;
