import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminProjectCategoriesTrash from '../../../../components/admin/posts/categories/AdminProjectCategoriesTrash';

const PostsProjectCategoriesTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_DELETE]}>
        <AdminLayout
          pageTitle="Categories Trash"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Categories', href: '/admin/posts/categories' },
            { label: 'Trash' },
          ]}
        >
          <AdminProjectCategoriesTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsProjectCategoriesTrashPage;
