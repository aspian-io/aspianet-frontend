import { NextPage } from 'next';
import AdminEmailTemplateForm from '../../../../components/admin/emails/templates/AdminEmailTemplateForm';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const EmailTemplatesAddNewPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Template"
          breadCrumbs={[
            { label: 'Email' },
            { label: 'Templates', href: '/admin/email/templates' },
            { label: 'Add New' },
          ]}
        >
          <AdminEmailTemplateForm />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default EmailTemplatesAddNewPage;
