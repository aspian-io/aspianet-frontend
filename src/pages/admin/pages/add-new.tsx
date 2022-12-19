import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import { PostTypeEnum } from '../../../models/posts/admin/post';

const PagesAddNewPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Page"
          breadCrumbs={[
            { label: 'Pages', href: '/admin/pages' },
            { label: 'Add New' },
          ]}
        >
          <AdminPostForm
            postType={PostTypeEnum.PAGE}
            onCreateSuccess={(id) => router.push(`/admin/pages/edit/${id}`)}
          />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PagesAddNewPage;
