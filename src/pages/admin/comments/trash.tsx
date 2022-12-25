import { NextPage } from 'next';
import AdminCommentsTrash from '../../../components/admin/comments/AdminCommentsTrash';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminPagesTrash from '../../../components/admin/pages/AdminPagesTrash';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const CommentsTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.COMMENT_DELETE]}>
        <AdminLayout
          pageTitle="Comments Trash"
          breadCrumbs={[
            { label: 'Comments', href: '/admin/comments' },
            { label: 'Trash' },
          ]}
        >
          <AdminCommentsTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default CommentsTrashPage;
