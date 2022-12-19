import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import { PostTypeEnum } from '../../../models/posts/admin/post';

const PostsAddBannerPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add Banner"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Add Banner' },
          ]}
        >
          <AdminPostForm
            postType={PostTypeEnum.BANNER}
            onCreateSuccess={(id) => router.push(`/admin/posts/edit/${id}`)}
          />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsAddBannerPage;
