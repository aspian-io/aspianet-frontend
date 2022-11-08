import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, PropsWithChildren, useCallback, useEffect } from 'react';
import { IAdminSideBarSubItemProps } from '../admin-sidebar.types';

const SubItem: FC<PropsWithChildren<IAdminSideBarSubItemProps>> = ({
  href,
  onActive,
  children,
}) => {
  const router = useRouter();

  const activeLinkCssGen = (): string => {
    return router.pathname === href
      ? 'outline-none bg-gray-800 text-light'
      : '';
  };

  useEffect(() => {
    if (router.pathname === href) onActive();
  }, [href, onActive, router.pathname]);

  return (
    <div>
      <Link
        href={href}
        className={`inline-block w-full px-4 py-1.5 text-xs rounded-lg hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 focus:text-light transition-all duration-500 ${activeLinkCssGen()}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default SubItem;
