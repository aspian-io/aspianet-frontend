import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminTags from '../../../../components/admin/posts/tags/AdminTags';

const PostsTagsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_READ]}>
        <AdminLayout
          pageTitle="Tags"
          breadCrumbs={[
            { label: 'Posts', href: '/admin/posts' },
            { label: 'Tags' },
          ]}
        >
          <AdminTags />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default PostsTagsPage;
