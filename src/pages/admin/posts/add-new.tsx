import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import { PostTypeEnum } from '../../../models/posts/admin/post';

const PostsAddNewPostPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Post"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Add New Post' },
          ]}
        >
          <AdminPostForm
            postType={PostTypeEnum.BLOG}
            onCreateSuccess={(id) => router.push(`/admin/posts/edit/${id}`)}
          />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsAddNewPostPage;
