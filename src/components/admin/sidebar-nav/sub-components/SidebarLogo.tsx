import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { IAdminSideBarLogoProps } from '../admin-sidebar.types';

const SidebarLogo: FC<IAdminSideBarLogoProps> = ({ src, href }) => {
  return (
    <Link
      href={href}
      className="p-1.5 rounded-xl flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <div className="relative w-40 h-12">
        <Image
          src={src}
          fill
          placeholder="blur"
          blurDataURL={imgPlaceholderDataURL}
          alt="Logo"
          priority
        />
      </div>
    </Link>
  );
};

export default SidebarLogo;
