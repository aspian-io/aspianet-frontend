import { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { AuthGuard } from '../../components/common/AuthGuard';
import Button from '../../components/common/Button';
import ConfirmModal from '../../components/common/ConfirmModal';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Profile from '../../components/site/users/profile/Profile';
import { UserAgent } from '../../lib/agent';
import { authOptions } from '../api/auth/[...nextauth]';
import { useState } from 'react';

interface IProps {
  isUpdateAvatarAllowed: boolean;
}

const ProfilePage: NextPage<IProps> = ({ isUpdateAvatarAllowed }) => {
  return (
    <AuthGuard claims={[]}>
      <SiteLayout>
        <Profile isUpdateAvatarAllowed={isUpdateAvatarAllowed} />
      </SiteLayout>
    </AuthGuard>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    try {
      const isUpdateAvatarAllowed = await UserAgent.isUpdateAvatarAllowed(
        session
      );

      return {
        props: {
          isUpdateAvatarAllowed,
        },
      };
    } catch (error) {
      return {
        props: {
          isUpdateAvatarAllowed: false,
        },
      };
    }
  }
  return {
    props: {
      isUpdateAvatarAllowed: false,
    },
  };
};
