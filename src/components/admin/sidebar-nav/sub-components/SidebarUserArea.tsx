import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState, useEffect } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';

interface IProps {
  userPhotoSrc?: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  items: {
    label: string;
    pathname: string;
  }[];
  signOutLabel: string;
}

const SidebarUserArea: FC<IProps> = ({
  userPhotoSrc,
  userFirstName,
  userLastName,
  username,
  items,
  signOutLabel,
}) => {
  const router = useRouter();
  const pathnames = items.map((i) => i.pathname);
  const [userTabOpen, setUserTabOpen] = useState(
    pathnames.includes(router.pathname)
  );

  const activeLinkCssGen = (pathname: string): string => {
    return router.pathname === pathname
      ? 'outline-none ring-1 ring-gray-500 text-light'
      : '';
  };

  return (
    <div className="py-4 bg-gray-800 flex flex-col items-start justify-center bottom-0 rounded-b-3xl">
      <div className="flex justify-between items-center w-full pl-6 pr-8">
        <div className="flex items-center">
          <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-success before:rounded-full ltr:before:right-0 rtl:before:left-0 before:bottom-0 before:ring-1 before:ring-light before:z-10">
            {userPhotoSrc ? (
              <Image
                className="rounded-full"
                src={userPhotoSrc}
                fill
                placeholder="blur"
                blurDataURL={imgPlaceholderDataURL}
                alt="User Photo"
              />
            ) : (
              <div className="flex justify-center items-center absolute w-full h-full bg-primary text-light rounded-full">
                {userFirstName[0]}
              </div>
            )}
          </div>
          <div className="flex flex-col ltr:pl-3 rtl:pr-3">
            <div className="text-sm text-gray-50">
              {userFirstName} {userLastName}
            </div>
            <span className="text-xs text-gray-400 font-light tracking-tight">
              {username}
            </span>
          </div>
        </div>
        <button
          className={`text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light ${
            userTabOpen ? '-rotate-90' : 'ltr:rotate-0 rtl:rotate-180'
          } transition-transform duration-300`}
          onClick={(e) => setUserTabOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-start items-center w-full">
        <div
          className={`flex flex-col justify-center pt-8 pb-8 overflow-hidden ${
            userTabOpen ? 'max-h-40' : 'max-h-0 pt-0 pb-0'
          } w-full transition-all duration-300`}
        >
          <div
            className={`flex flex-col text-gray-500 ltr:pl-14 rtl:pr-14 space-y-1 px-10`}
          >
            {items.map((item, i) => (
              <div key={i}>
                <Link
                  href={item.pathname}
                  className={`inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500 ${activeLinkCssGen(
                    item.pathname
                  )}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div
              className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500 cursor-pointer"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              {signOutLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarUserArea;
