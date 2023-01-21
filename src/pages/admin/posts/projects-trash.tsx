import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminProjectsTrash from '../../../components/admin/posts/AdminProjectsTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const PostsProjectsTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Projects Trash"
          breadCrumbs={[
            { label: 'Projects', href: '/admin/posts/projects' },
            { label: 'Projects Trash' },
          ]}
        >
          <AdminProjectsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsProjectsTrashPage;
