import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { FC, useId } from 'react';
import { AvatarSourceEnum } from '../../../../../models/users/common';
import ChangeAvatar from './ChangeAvatar';

interface IProps {
  responsive?: boolean;
}

const ProfileAvatar: FC<IProps> = ({ responsive = false }) => {
  const { data: session } = useSession();
  const profilePhotoId = useId();

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
                    ? `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${session.user.avatar}`
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
                    ? `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${session.user.avatar}`
                    : session.user.avatar
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                placeholder='blur'
                blurDataURL={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${session.user.avatar}`}
                alt="Avatar"
              />
              <ChangeAvatar />
            </div>
          ) : (
            <div className="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-primary text-light">
              {session?.user.firstName[0].toUpperCase()}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileAvatar;
