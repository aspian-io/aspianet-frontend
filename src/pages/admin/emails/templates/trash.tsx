import { NextPage } from 'next';
import AdminEmailTemplatesTrash from '../../../../components/admin/emails/templates/AdminEmailTemplatesTrash';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const EmailTemplatesTrashPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_DELETE]}>
        <AdminLayout
          pageTitle="Templates Trash"
          breadCrumbs={[
            { label: 'Email' },
            { label: 'Templates', href: '/admin/email/templates' },
            { label: 'Trash' },
          ]}
        >
          <AdminEmailTemplatesTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default EmailTemplatesTrashPage;
