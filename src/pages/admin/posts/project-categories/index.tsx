import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminProjectCategories from '../../../../components/admin/posts/categories/AdminProjectCategories';

const PostsProjectCategoriesPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_READ]}>
        <AdminLayout
          pageTitle="Categories"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Categories' },
          ]}
        >
          <AdminProjectCategories />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsProjectCategoriesPage;
