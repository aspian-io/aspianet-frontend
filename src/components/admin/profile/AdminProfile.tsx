import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { AdminUserKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import { IUserEntity } from '../../../models/users/admin/user';
import Loading from '../../common/Loading';
import TopBar from '../topbar/TopBar';
import AvatarCard from './sub-components/AvatarCard';
import ContactInfoCard from './sub-components/ContactInfoCard';
import PersonalInfoCard from './sub-components/PersonalInfoCard';
import SocialNetworkInfoCard from './sub-components/SocialNetworkInfoCard';

const AdminProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const userDetailsFetcher = () =>
    AdminUserAgent.details(session, session!.user.id);

  const { data: userData, error } = useSWR<IUserEntity, AxiosError<INestError>>(
    AdminUserKeys.GET_USER_DETAILS,
    userDetailsFetcher
  );

  if (error) router.push('/500');
  if (!userData) return <Loading />;

  return (
    <div className="flex flex-col justify-center items-center pb-4 space-y-4">
      <TopBar title='Profile' />
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <AvatarCard session={session} userData={userData} />
        <PersonalInfoCard userData={userData} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <ContactInfoCard userData={userData} />
        <SocialNetworkInfoCard userData={userData} />
      </div>
    </div>
  );
};

export default AdminProfile;
