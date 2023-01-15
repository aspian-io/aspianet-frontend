import { useRouter } from 'next/router';
import React, { FC, useEffect, useState, useMemo, memo } from 'react';
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
    menuItems[defaultMenuItemIndex].href
  );
  const itemsHrefs = useMemo(() => menuItems?.map((i) => i.href), [menuItems]);

  useEffect(() => {
    if (router.asPath !== '/') {
      setActiveItem(menuItems[defaultMenuItemIndex].href);
    }
    if (router.asPath !== '/' && itemsHrefs.includes(router.asPath)) {
      setActiveItem(router.asPath);
    }
    if (router.asPath !== '/' && !itemsHrefs.includes(router.asPath)) {
      setActiveItem(undefined);
    }
  }, [defaultMenuItemIndex, itemsHrefs, menuItems, router.asPath]);

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
            href={item.href ?? '#'}
            isActive={activeItem === item.href}
            onClick={() => setActiveItem(item.href!)}
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
