import { useRouter } from 'next/router';
import React, { FC, useEffect, useState, memo } from 'react';
import { SiteNav } from '../../nav/SiteNav';
import { ISiteLayoutProps } from '../SiteLayout';
const { Item } = SiteNav;

const SiteHeader: FC<ISiteLayoutProps> = ({
  headerMenuItems: menuItems,
  defaultMenuItemIndex = 0,
  siteLogo,
  siteOverlayLogo,
}) => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(
    menuItems[defaultMenuItemIndex]?.href
  );

  useEffect(() => {
    if (router.pathname === '/') {
      setActiveItem(menuItems[defaultMenuItemIndex].href);
    } else {
      setActiveItem(router.asPath.replace(router.query as any, ' '));
    }
  }, [
    defaultMenuItemIndex,
    menuItems,
    router.asPath,
    router.pathname,
    router.query,
  ]);

  return (
    <>
      <SiteNav
        logo={siteLogo}
        overlayLogo={siteOverlayLogo}
        loginRegisterHref="/auth/login"
        loginRegisterLabel={'Login/Register'}
      >
        {menuItems?.map((item, i) => (
          <Item
            href={item.href ?? '/'}
            isActive={
              item.href && activeItem && item.href !== '/'
                ? activeItem.startsWith(item.href)
                : item.href === activeItem
                ? true
                : false
            }
            onClick={(e) => setActiveItem(item.href!)}
            key={i}
          >
            {item.term}
          </Item>
        ))}
      </SiteNav>
    </>
  );
};

export default memo(SiteHeader);
