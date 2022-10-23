import Link from 'next/link';
import React, {FC, PropsWithChildren} from 'react';
import { IAdminSideBarSubItemProps } from '../admin-sidebar.types';

const SubItem: FC<PropsWithChildren<IAdminSideBarSubItemProps>> = ({
  href,
  children,
}) => {
  return (
    <div>
      <Link href={href}>
        <a className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 focus:text-light transition-all duration-500">
          {children}
        </a>
      </Link>
    </div>
  );
};

export default SubItem;