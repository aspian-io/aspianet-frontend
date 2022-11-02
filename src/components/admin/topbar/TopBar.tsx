import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarSourceEnum } from '../../../models/auth/common';
import {
  getAdminLayoutState,
  setBackDropCss,
  setMinimizeSidebarCss,
  setSidebarSideLayoutCss,
} from '../../../store/slices/admin/admin-layout-slice';
import {
  SIDEBAR_HIDE_BACKDROP_CSS,
  SIDEBAR_HIDE_CSS,
  SIDEBAR_HIDE_SIDE_LAYOUT_CSS,
  SIDEBAR_SHOW_BACKDROP_CSS,
  SIDEBAR_SHOW_CSS,
  SIDEBAR_SHOW_SIDE_LAYOUT_CSS,
} from '../sidebar-nav/constants';

interface IProps {
  title: string;
  breadCrumbs: {
    label: string;
    href?: string;
  }[];
}

const TopBar: FC<IProps> = ({ title, breadCrumbs }) => {
  const { data: session } = useSession();
  const { sidebar } = useSelector(getAdminLayoutState);
  const dispatch = useDispatch();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navProfileBtnRef = useRef<HTMLDivElement>(null);

  const getUserAvatarSrc = () => {
    if (session?.user.avatar) {
      return session?.user.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session?.user.avatar}`
        : session?.user.avatar;
    }
    return '';
  };

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!navProfileBtnRef.current?.contains(e.target as any)) {
        setProfileMenuOpen(false);
      }
    });
  }, []);

  return (
    <div className="flex justify-start items-center w-full h-28 px-6 mb-6 bg-light rounded-3xl shadow">
      <div className="flex flex-col justify-center items-start w-full">
        <div className="flex justify-end items-center w-full">
          <button
            className={`flex items-center justify-center p-0.5 rounded focus:outline-none text-zinc-500 mr-auto`}
            onClick={(e) => {
              dispatch(
                setBackDropCss(
                  sidebar.backdropCss === SIDEBAR_HIDE_BACKDROP_CSS
                    ? SIDEBAR_SHOW_BACKDROP_CSS
                    : SIDEBAR_HIDE_BACKDROP_CSS
                )
              );
              dispatch(
                setMinimizeSidebarCss(
                  sidebar.minimizeSidebarCss === SIDEBAR_HIDE_CSS
                    ? SIDEBAR_SHOW_CSS
                    : SIDEBAR_HIDE_CSS
                )
              );
              dispatch(
                setSidebarSideLayoutCss(
                  sidebar.sidebarSideLayoutCss === SIDEBAR_SHOW_SIDE_LAYOUT_CSS
                    ? SIDEBAR_HIDE_SIDE_LAYOUT_CSS
                    : SIDEBAR_SHOW_SIDE_LAYOUT_CSS
                )
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className="flex justify-center items-center cursor-pointer relative"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            ref={navProfileBtnRef}
          >
            <div className="mr-2 text-zinc-600 text-sm">
              Hi,{' '}
              <span className="font-semibold">{session?.user.firstName}</span>
            </div>
            <div className="flex relative w-8 h-8 rounded-full">
              {session?.user.avatar ? (
                <Image
                  className="rounded-full"
                  src={getUserAvatarSrc()}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="User Photo"
                />
              ) : (
                <div className="flex justify-center items-center absolute w-full h-full bg-primary text-light rounded-full">
                  {session?.user.firstName[0]}
                </div>
              )}
            </div>

            <div
              className={`${
                profileMenuOpen
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible -translate-y-2 opacity-0'
              } flex flex-col absolute z-50 drop-shadow-xl top-11 lg:top-14 right-0 p-2 text-zinc-500 bg-light text-sm rounded-lg transition-all duration-300`}
            >
              <Link href="/admin/profile">
                <a className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300">
                  Profile
                </a>
              </Link>
              <Link href="/admin/security">
                <a className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300">
                  Security
                </a>
              </Link>
              <button
                type="button"
                className="flex justify-between items-center px-4 py-2 rounded-xl hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <hr className="w-full my-2.5 border-primary/20" />
        <div className="flex justify-center items-start">
          <div className="text-primary font-bold sm:text-xl">{title}</div>
          <div className="text-sm text-zinc-400 self-center mt-1 ml-6">
            {breadCrumbs.map((bc, i) => (
              <span
                className="[&:not(:first-child)]:before:content-['•'] [&:not(:first-child)]:before:mx-2"
                key={i}
              >
                {bc.href ? (
                  <Link href={bc.href}>
                    <a className="hoverable:hover:text-blue-400 text-xs">
                      {bc.label}
                    </a>
                  </Link>
                ) : (
                  <span className="text-xs">{bc.label}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
