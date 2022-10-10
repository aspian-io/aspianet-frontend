import React, { useState, useEffect, FC } from 'react';
import Link from 'next/link';
import Button from '../../../common/Button';
import ChangeAvatar from './sub-components/ChangeAvatar';
import ProfileAvatar from './sub-components/ProfileAvatar';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { UserAgent } from '../../../../lib/axios/agent';
import { IUserProfile } from '../../../../models/users/profile';
import { AxiosError } from 'axios';
import { INestError } from '../../../../models/common/error';
import { useRouter } from 'next/router';
import Loading from '../../../common/Loading';
import ProfileForm from './sub-components/ProfileForm';
import { UserKeys } from '../../../../lib/swr/keys';
import SecurityForm from './sub-components/SecurityForm';
import UserBookmarks from './sub-components/UserBookmarks';

interface IProps {
  isUpdateAvatarAllowed: boolean;
}

const Profile: FC<IProps> = ({ isUpdateAvatarAllowed }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const fetcher = () => UserAgent.getCurrentUserProfile(session);
  const { data: profileData, error } = useSWR<
    IUserProfile,
    AxiosError<INestError>
  >(UserKeys.GET_CURRENT_USER_PROFILE, fetcher);
  const [bioSummary, setBioSummary] = useState(true);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'privacy' | 'bookmark'
  >('profile');

  useEffect(() => {
    const routeHash = router.asPath.split('#')[1];
    if (routeHash) {
      if (routeHash === 'profile') setActiveTab('profile');
      if (routeHash === 'security') setActiveTab('privacy');
      if (routeHash === 'bookmarks') setActiveTab('bookmark');
    }
  }, [router.asPath]);

  if (error) router.push('/500');
  if (!profileData) return <Loading />;

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start px-2 sm:px-8 lg:px-0 py-6 sm:py-8 bg-zinc-100 rounded-3xl my-4 lg:my-8">
      {/* Responsive menu starts */}
      <div className="flex flex-col sm:flex-row lg:hidden justify-between items-center w-full mb-1 sm:mb-4 px-6 sm:divide-x-2">
        <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:max-w-[25%] space-x-3 group">
          <div className="relative flex flex-col justify-center items-center mb-2 sm:mb-0">
            <ProfileAvatar responsive />
            {isUpdateAvatarAllowed && !session?.user.avatar && (
              <ChangeAvatar responsive noAvatarMode />
            )}
            {isUpdateAvatarAllowed && session?.user.avatar && (
              <ChangeAvatar responsive />
            )}
          </div>
        </div>
        {/* Tabs Wrapper starts */}
        <div className="flex justify-center items-center w-full sm:w-3/4 space-x-2 sm:space-x-3 mt-2 sm:mt-0">
          {/* Profile starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('profile')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'profile' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Profile
                </div>
              </a>
            </Link>
          </div>
          {/* Privacy starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'privacy' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Security
                </div>
              </a>
            </Link>
          </div>
          {/* Bookmarks starts */}
          <div className="flex items-center group h-14">
            <Link href="#">
              <a
                onClick={() => setActiveTab('bookmark')}
                className={`flex items-center h-9 px-4 sm:pl-0 sm:pr-4 rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'bookmark' ? 'bg-primary' : 'bg-light'
                } transition-all duration-300`}
              >
                <div
                  className={`hidden sm:flex w-9 h-9 justify-center items-center hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-primary'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`text-xs hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-primary'
                  } transition-all duration-300`}
                >
                  Bookmarks
                </div>
              </a>
            </Link>
          </div>
        </div>
        {/* Tabs Wrapper ends */}
      </div>
      {/* Responsive menu ends */}

      {/* lg menu starts */}
      <div className="hidden lg:flex flex-col min-w-[270px] lg:w-1/4 rounded-2xl py-10 px-8 bg-zinc-100">
        <div className="flex flex-col justify-center items-center">
          <div className="group">
            <ProfileAvatar isUpdateAvatarAllowed={isUpdateAvatarAllowed} />
          </div>
          <div className="mt-6 text-lg text-dark font-semibold">
            Hi {session?.user.firstName}
          </div>
          <div className="text-center">
            {profileData.bio && profileData.bio.length > 84 ? (
              <>
                <span
                  className={`text-zinc-500 pt-2 ${
                    bioSummary ? 'line-clamp-2' : ''
                  }`}
                >
                  {profileData.bio}
                </span>
                <span>
                  <Button
                    rounded="rounded-lg"
                    size="h-6"
                    type="button"
                    variant="link"
                    extraCSSClasses="outline-primary ml-2"
                    onClick={() => setBioSummary(!bioSummary)}
                  >
                    {bioSummary ? 'more' : 'less'}
                  </Button>
                </span>
              </>
            ) : (
              <span className="text-zinc-500 pt-2">{profileData.bio}</span>
            )}
          </div>
        </div>
        <div className="py-8 px-4">
          <hr className="border-zinc-300" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center group h-14">
            <Link href="#profile">
              <a
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'profile' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'profile' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Profile
                </div>
              </a>
            </Link>
          </div>
          <div className="flex items-center group h-14">
            <Link href="#security">
              <a
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'privacy' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'privacy' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Security
                </div>
              </a>
            </Link>
          </div>
          <div className="flex items-center group h-14">
            <Link href="#bookmarks">
              <a
                onClick={() => setActiveTab('bookmark')}
                className={`flex items-center w-full rounded-xl outline-none hoverable:group-hover:bg-primary hoverable:group-hover:scale-110 ${
                  activeTab === 'bookmark' ? 'bg-primary' : ''
                } transition-all duration-300`}
              >
                <div className="w-9 h-9 bg-primary rounded-xl text-light flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`pl-4 text-md hoverable:group-hover:text-light ${
                    activeTab === 'bookmark' ? 'text-light' : 'text-zinc-600'
                  } transition-all duration-300`}
                >
                  Bookmarks
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* lg menu ends */}

      {/* Profile tab starts */}
      <div
        className={`${
          activeTab === 'profile'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <ProfileForm initialFormValues={profileData} />
      </div>
      {/* Profile tab ends */}

      {/* Security tab starts */}
      <div
        className={`${
          activeTab === 'privacy'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <SecurityForm />
      </div>
      {/* Security tab ends */}

      {/* Bookmarks tab starts */}
      <div
        className={`${
          activeTab === 'bookmark'
            ? 'flex w-full lg:w-3/4 h-full p-8 lg:mx-8'
            : 'w-0 h-0 scale-0 opacity-0 p-0 mx-0'
        } flex-col items-start bg-light rounded-3xl z-0 transition-all duration-300`}
      >
        <UserBookmarks />
      </div>
      {/* Bookmarks tab ends */}
    </div>
  );
};

export default Profile;
