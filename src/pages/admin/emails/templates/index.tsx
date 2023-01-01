import { NextPage } from 'next';
import AdminEmailTemplates from '../../../../components/admin/emails/templates/AdminEmailTemplates';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const EmailTemplatesPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Templates"
          breadCrumbs={[{ label: 'Email' }, { label: 'Templates' }]}
          topBarBackArrow={false}
        >
          <AdminEmailTemplates />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default EmailTemplatesPage;
