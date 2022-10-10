import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FC } from 'react';
import { AvatarSourceEnum } from '../../../../../models/auth/common';
import ChangeAvatar from './ChangeAvatar';

interface IProps {
  responsive?: boolean;
  isUpdateAvatarAllowed?: boolean;
}

const ProfileAvatar: FC<IProps> = ({
  isUpdateAvatarAllowed = false,
  responsive = false,
}) => {
  const { data: session } = useSession();

  return (
    <>
      {responsive ? (
        <>
          {session?.user.avatar ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-zinc-100 hoverable:group-hover:ring-offset-0 transition-all duration-700">
              <Image
                className="hoverable:group-hover:scale-110 hoverable:group-hover:rotate-3 transition-transform duration-700"
                src={
                  session.user.avatarSource === AvatarSourceEnum.STORAGE
                    ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session.user.avatar}`
                    : session.user.avatar
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt="Avatar"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-primary text-light">
              {session?.user.firstName[0].toUpperCase()}
            </div>
          )}
        </>
      ) : (
        <>
          {session?.user.avatar ? (
            <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-zinc-100 hoverable:group-hover:ring-offset-0 transition-all duration-300">
              <Image
                className="hoverable:group-hover:scale-110 hoverable:group-hover:rotate-3 transition-transform duration-300"
                src={
                  session.user.avatarSource === AvatarSourceEnum.STORAGE
                    ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session.user.avatar}`
                    : session.user.avatar
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session.user.avatar}`}
                alt="Avatar"
              />
              {isUpdateAvatarAllowed && <ChangeAvatar />}
            </div>
          ) : (
            <div className="flex justify-center items-center h-36 w-36 rounded-full overflow-hidden bg-primary text-light">
              {isUpdateAvatarAllowed ? (
                <ChangeAvatar noAvatarMode />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileAvatar;
