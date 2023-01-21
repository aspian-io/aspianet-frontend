import { NextPage } from 'next';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import AdminProjects from '../../../components/admin/posts/AdminProjects';
import { AuthGuard } from '../../../components/common/AuthGuard';
import { ClaimsEnum } from '../../../models/auth/common';

const ProjectsPage: NextPage = () => {
  return (
    <>
      <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.POST_READ]}>
        <AdminLayout
          pageTitle="All Projects"
          breadCrumbs={[{ label: 'Posts' }, { label: 'All Projects' }]}
        >
          <AdminProjects />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default ProjectsPage;
