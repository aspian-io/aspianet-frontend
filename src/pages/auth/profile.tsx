import { NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Profile from '../../components/site/users/profile/Profile';

const ProfilePage: NextPage = () => {
  return (
    <SiteLayout>
      <Profile />
    </SiteLayout>
  );
};

export default ProfilePage;
