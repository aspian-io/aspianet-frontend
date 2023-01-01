import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminNewsletterTemplates from '../../../../components/admin/newsletter/templates/AdminNewsletterTemplates';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterTemplatesPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Templates"
          breadCrumbs={[{ label: 'Newsletter' }, { label: 'Templates' }]}
          topBarBackArrow={false}
        >
          <AdminNewsletterTemplates />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterTemplatesPage;
