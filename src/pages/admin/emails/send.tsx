import { NextPage } from 'next';
import AdminSendMail from '../../../components/admin/emails/AdminSendMail';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const EmailSendPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.EMAIL_SEND]}>
        <AdminLayout
          pageTitle="Send Email"
          breadCrumbs={[{ label: 'Email' }, { label: 'Send' }]}
          topBarBackArrow={false}
        >
          <AdminSendMail />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default EmailSendPage;
