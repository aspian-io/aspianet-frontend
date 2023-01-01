import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';
import AdminSentEmails from '../../../../components/admin/emails/AdminSentEmails';

const SentEmailsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_READ]}>
        <AdminLayout
          pageTitle="All Sent Emails"
          breadCrumbs={[{ label: 'Emails' }, { label: 'All Sent Emails' }]}
        >
          <AdminSentEmails />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default SentEmailsPage;
