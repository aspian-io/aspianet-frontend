import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect, useRef } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { IUserAuth } from '../../../../models/auth/auth';
import { AvatarSourceEnum, ClaimsEnum } from '../../../../models/auth/common';
import { AuthGuard } from '../../../common/AuthGuard';

interface IProps {
  responsive: boolean;
  user: IUserAuth;
}

const SiteNavAuthUser: FC<IProps> = ({ user, responsive }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navProfileBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!navProfileBtnRef.current?.contains(e.target as any)) {
        setProfileMenuOpen(false);
      }
    });
  }, []);

  const getUserAvatarSrc = () => {
    if (user.avatar) {
      return user.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${user.avatar}`
        : user.avatar;
    }
    return '';
  };

  return (
    <div className="relative">
      <div
        className="flex lg:pl-5 cursor-pointer"
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        ref={navProfileBtnRef}
      >
        {user.avatar ? (
          <div className="relative h-7 w-7 lg:h-10 lg:w-10 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 hoverable:hover:ring-offset-0 hoverable:hover:scale-110 transition-all duration-300">
            <Image
              src={getUserAvatarSrc()}
              fill
              sizes="(max-width: 44px) 10vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              alt="Profile Photo"
              priority
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-8 w-8 lg:h-10 lg:w-10 rounded-full overflow-hidden bg-primary text-light">
            {user.firstName[0].toUpperCase()}
          </div>
        )}
      </div>
      <div
        className={`${
          profileMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } flex flex-col absolute drop-shadow-xl top-11 lg:top-14 right-0 p-2 text-zinc-500 bg-light text-sm rounded-lg transition-all duration-300`}
      >
        <AuthGuard claims={Object.values(ClaimsEnum)} redirect={false}>
          <Link
            href="/admin"
            className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="inline-block pl-1">Admin</span>
          </Link>
        </AuthGuard>
        <Link
          href="/users/profile"
          className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
          <span className="inline-block pl-1">Profile</span>
        </Link>
        <button
          type="button"
          className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
              clipRule="evenodd"
            />
          </svg>
          <span className="inline-block pl-1">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SiteNavAuthUser;
