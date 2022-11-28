import { NextPage } from 'next';
import AdminCategories from '../../../../components/admin/posts/categories/AdminCategories';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const PostsCategoriesPage: NextPage = () => {
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
          <AdminCategories />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsCategoriesPage;
