import { NextPage, GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import AdminDashboard from '../../components/admin/dashboard/AdminDashboard';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { AuthGuard } from '../../components/common/AuthGuard';
import { ClaimsEnum } from '../../models/auth/common';
import { authOptions } from '../api/auth/[...nextauth]';
import { AdminDashboardAgent } from '../../lib/axios/agent';
import {
  IDashboardPostsStatsDto,
  IDashboardSystemStats,
} from '../../models/dashboard/dashboard';

interface IProps {
  systemStats: IDashboardSystemStats;
  postStats: IDashboardPostsStatsDto;
}

const AdminPage: NextPage<IProps> = ({ systemStats, postStats }) => {
  return (
    <>
      <AuthGuard claims={Object.values(ClaimsEnum)}>
        <AdminLayout
          pageTitle="Dashboard"
          breadCrumbs={[{ label: 'Dashboard' }]}
        >
          <AdminDashboard systemStats={systemStats} postStats={postStats} />
        </AdminLayout>
      </AuthGuard>
    </>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  try {
    const systemStats = await AdminDashboardAgent.systemStats(session);
    const postStats = await AdminDashboardAgent.postsStats(session);

    return {
      props: {
        systemStats,
        postStats,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
