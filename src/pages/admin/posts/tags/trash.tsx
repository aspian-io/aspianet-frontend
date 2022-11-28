import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminTagsTrash from '../../../../components/admin/posts/tags/AdminTagsTrash';

const PostsTagsTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}>
        <AdminLayout
          pageTitle="Tags Trash"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Tags', href: '/admin/posts/tags' },
            { label: 'Trash' },
          ]}
        >
          <AdminTagsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsTagsTrashPage;
