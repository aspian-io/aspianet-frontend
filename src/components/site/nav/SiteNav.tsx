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

// Site Navigation Menu Component
const SiteNav: ISiteNav<ISiteNavProps> = ({
  logoSrc,
  overlayLogoSrc,
  loginRegisterLabel,
  loginRegisterHref,
  children,
}) => {
  const { siteNav } = useSelector(getLayoutState);
  const { isSearchOpen } = siteNav;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4 text-sm shadow shadow-zinc-100 bg-light sticky top-0">
      <div className="container mx-auto flex flex-row justify-between items-center relative">
        <SiteNavLogo
          isOpen={isOpen}
          logoSrc={logoSrc}
          overlayLogoSrc={overlayLogoSrc}
        />
        <SiteNavItemsWrapper isOpen={isOpen}>{children}</SiteNavItemsWrapper>
        <div
          className={`hidden lg:flex lg:flex-row justify-end items-center text-primary divide-x lg:w-auto ${
            isSearchOpen ? 'grow' : ''
          }`}
        >
          <div className="flex flex-row items-center justify-end w-full">
            <SiteNavSearch
              responsive={false}
              searchPlaceholderLabel="Search..."
            />
            <SiteNavOpenSearchBtn />
          </div>
          <SiteNavAuthBtn
            responsive={false}
            loginRegisterHref={loginRegisterHref}
            loginRegisterLabel={loginRegisterLabel}
          />
        </div>
        <SiteNavHamburgerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="container mx-auto flex flex-row justify-between items-center pb-1 pt-4 lg:hidden">
        <SiteNavSearch responsive={true} searchPlaceholderLabel="Search..." />
        <div className="flex flex-row justify-end items-center pl-2">
          <SiteNavAuthBtn
            responsive={true}
            loginRegisterHref={loginRegisterHref}
          />
        </div>
      </div>
    </div>
  );
};

// Navigation Menu Item Component
const Item: FC<PropsWithChildren<INavItemProps>> = ({
  href,
  isActive,
  children,
}) => {
  const css = isActive
    ? 'lg:flex lg:relative lg:text-primary lg:before:absolute lg:before:left-0.5 lg:before:-bottom-1 lg:before:w-10/12 lg:before:h-0.5 lg:before:bg-primary'
    : 'lg:hoverable:hover:text-primary';
  return (
    <Link href={href} passHref>
      <a
        className={`block w-full py-3 text-center lg:w-auto lg:py-0 hoverable:hover:text-dark ${css}`}
      >
        {children}
      </a>
    </Link>
  );
};

SiteNav.Item = Item;

export { SiteNav };
