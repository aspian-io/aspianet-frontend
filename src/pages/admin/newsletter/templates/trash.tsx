import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminNewsletterTemplatesTrash from '../../../../components/admin/newsletter/templates/AdminNewsletterTemplatesTrash';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterTemplatesTrash: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Templates Trash"
          breadCrumbs={[
            { label: 'Newsletter' },
            { label: 'Templates', href: '/admin/newsletter/templates' },
            { label: 'Trash' },
          ]}
        >
          <AdminNewsletterTemplatesTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterTemplatesTrash;
