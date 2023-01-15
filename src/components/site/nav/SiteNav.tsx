import React, { FC, PropsWithChildren, useState } from 'react';
import Link from 'next/link';
import { INavItemProps, ISiteNav, ISiteNavProps } from './site-nav.types';
import SiteNavSearch from './sub-components/SiteNavSearch';
import { useSelector } from 'react-redux';
import { getLayoutState } from '../../../store/slices/layout-slice';
import SiteNavAuthBtn from './sub-components/SiteNavAuthBtn';
import SiteNavHamburgerBtn from './sub-components/SiteNavHamburgerBtn';
import SiteNavLogo from './sub-components/SiteNavLogo';
import SiteNavItemsWrapper from './sub-components/SiteNavItemsWrapper';
import SiteNavOpenSearchBtn from './sub-components/SiteNavOpenSearchBtn';
import SiteNavAuthUser from './sub-components/SiteNavAuthUser';
import LoadingSpinner from '../../common/LoadingSpinner';
import { useSession } from 'next-auth/react';

// Site Navigation Menu Component
const SiteNav: ISiteNav<ISiteNavProps> = ({
  logo,
  overlayLogo,
  loginRegisterLabel,
  loginRegisterHref,
  children,
}) => {
  const { siteNav } = useSelector(getLayoutState);
  const { data: session, status } = useSession();
  const { isSearchOpen } = siteNav;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 text-sm shadow shadow-zinc-100 bg-light sticky top-0 z-10">
      <div className="container mx-auto flex flex-row justify-between items-center relative">
        <SiteNavLogo
          isOpen={isOpen}
          logo={logo}
          overlayLogo={overlayLogo}
        />
        <SiteNavItemsWrapper isOpen={isOpen}>{children}</SiteNavItemsWrapper>
        <div
          className={`hidden lg:flex lg:flex-row justify-end items-center text-primary lg:w-auto ${
            isSearchOpen ? 'grow' : ''
          }`}
        >
          <div className="flex flex-row items-center justify-end w-full border-r">
            <SiteNavSearch
              responsive={false}
              searchPlaceholderLabel="Search..."
            />
            <SiteNavOpenSearchBtn />
          </div>
          {status === 'loading' && <LoadingSpinner className="h-7 w-7 ml-5" />}
          {status === 'authenticated' && session && (
            <SiteNavAuthUser user={session.user} responsive={false} />
          )}
          {status === 'unauthenticated' && !session && (
            <SiteNavAuthBtn
              responsive={false}
              loginRegisterHref={loginRegisterHref}
              loginRegisterLabel={loginRegisterLabel}
            />
          )}
        </div>
        <SiteNavHamburgerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="container mx-auto flex flex-row justify-between items-center pb-1 pt-4 lg:hidden">
        <SiteNavSearch responsive={true} searchPlaceholderLabel="Search..." />
        <div className="flex flex-row justify-end items-center pl-2">
          {status === 'loading' && <LoadingSpinner className="h-5 w-5 mx-1" />}
          {status === 'authenticated' && session && (
            <SiteNavAuthUser user={session.user} responsive={true} />
          )}
          {status === 'unauthenticated' && !session && (
            <SiteNavAuthBtn
              responsive={true}
              loginRegisterHref={loginRegisterHref}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Navigation Menu Item Component
const Item: FC<PropsWithChildren<INavItemProps>> = ({
  href,
  isActive,
  onClick = () => {},
  children,
}) => {
  const css = isActive
    ? 'lg:relative lg:text-primary lg:before:absolute lg:before:left-0.5 lg:before:-bottom-1 lg:before:w-10/12 lg:before:h-0.5 lg:before:bg-primary lg:before:visible lg:before:opacity-100 lg:transition-all lg:duration-300'
    : 'lg:hoverable:hover:text-primary lg:relative lg:text-zinc-700 lg:before:absolute lg:before:left-0.5 lg:before:-bottom-1 lg:before:w-10/12 lg:before:h-0.5 lg:before:bg-primary lg:before:invisible lg:before:opacity-0 lg:transition-all lg:duration-300';
  return (
    <Link
      href={href}
      className={`block w-full py-3 text-center lg:w-auto lg:py-0 hoverable:hover:text-dark lg:relative lg:before:absolute lg:before:left-0.5 lg:before:-bottom-1 lg:before:w-10/12 lg:before:h-0.5 lg:before:bg-primary ${
        isActive
          ? 'lg:text-primary lg:before:visible lg:before:opacity-100'
          : 'lg:hoverable:hover:text-primary lg:text-zinc-700 lg:before:invisible lg:before:opacity-0'
      } lg:transition-all lg:duration-300`}
      onClick={(e) => onClick(e)}
      passHref
    >
      {children}
    </Link>
  );
};

SiteNav.Item = Item;

export { SiteNav };
