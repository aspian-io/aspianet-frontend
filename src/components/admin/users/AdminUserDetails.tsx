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
import SocialNetworkInfoCard from '../profile/sub-components/SocialNetworkInfoCard';
import UserDetailsAvatar from './sub-components/details/UserDetailsAvatar';
import UserDetailsContactInfo from './sub-components/details/UserDetailsContactInfo';
import UserDetailsPersonalInfo from './sub-components/details/UserDetailsPersonlaInfo';
import UserDetailsSecurityInfo from './sub-components/details/UserDetailsSecurityInfo';
import UserDetailsSocialInfo from './sub-components/details/UserDetailsSocialInfo';

const AdminUserDetails = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const id = router.query.id as string;

  const userDetailsFetcher = () => AdminUserAgent.details(session, id);

  const { data: userData, error } = useSWR<IUserEntity, AxiosError<INestError>>(
    `${AdminUserKeys.GET_USER_DETAILS}/${id}`,
    userDetailsFetcher
  );

  if (error) router.push('/500');
  if (!userData) return <Loading />;
  return (
    <div className="flex flex-col justify-center items-center pb-4 space-y-4">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <UserDetailsAvatar session={session} userData={userData} />
        <UserDetailsPersonalInfo userData={userData} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <UserDetailsContactInfo userData={userData} />
        <UserDetailsSocialInfo userData={userData} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:space-x-4 space-y-4 lg:space-y-0">
        <UserDetailsSecurityInfo userData={userData} />
      </div>
    </div>
  );
};

export default AdminUserDetails;
