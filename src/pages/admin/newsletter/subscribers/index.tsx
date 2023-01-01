import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminSubscribers from '../../../../components/admin/newsletter/subscribers/AdminSubscribers';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterSubscribersPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_READ]}>
        <AdminLayout
          pageTitle="All Subscribers"
          breadCrumbs={[{ label: 'Newsletter' }, { label: 'Subscribers' }]}
          topBarBackArrow={false}
        >
          <AdminSubscribers />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterSubscribersPage;
