import { NextPage } from 'next';
import AdminLayout from '../../../../components/admin/layout/AdminLayout';
import AdminTemplateForm from '../../../../components/admin/newsletter/templates/AdminTemplateForm';
import { AuthGuard } from '../../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../../models/auth/common';

const NewsletterTemplateAddNewPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_CREATE]}>
        <AdminLayout
          pageTitle="Add New Template"
          breadCrumbs={[
            { label: 'Newsletter' },
            { label: 'Templates', href: '/admin/newsletter/templates' },
            { label: 'Add New' },
          ]}
        >
          <AdminTemplateForm />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default NewsletterTemplateAddNewPage;
