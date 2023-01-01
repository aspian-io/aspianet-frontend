import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminSubscribersTrash from '../../../../components/admin/newsletter/subscribers/AdminSubscribersTrash';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterSubscribersTrash: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_DELETE]}>
        <AdminLayout
          pageTitle="Subscribers Trash"
          breadCrumbs={[
            { label: 'Newsletter' },
            { label: 'Subscribers', href: '/admin/newsletter/subscribers' },
            { label: 'Trash' },
          ]}
        >
          <AdminSubscribersTrash />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterSubscribersTrash;
