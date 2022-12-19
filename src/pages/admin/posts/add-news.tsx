import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPostForm from '../../../components/admin/posts/AdminPostForm';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';
import { PostTypeEnum } from '../../../models/posts/admin/post';

const PostsAddNewsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add News"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Add News' },
          ]}
        >
          <AdminPostForm postType={PostTypeEnum.NEWS} />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsAddNewsPage;
