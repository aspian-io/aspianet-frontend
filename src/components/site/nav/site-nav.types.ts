import { FC, PropsWithChildren } from 'react';

// Site Navigation Menu Type
export interface ISiteNav<P> extends FC<PropsWithChildren<P>> {
  Item: FC<PropsWithChildren<INavItemProps>>;
}

// Navigation Menu Item Component Props Type
export interface INavItemProps {
  href: string;
  isActive: boolean;
}

// Site Navigation Menu Props Type
export interface ISiteNavProps {
  logoSrc: string;
  overlayLogoSrc: string;
  loginRegisterLabel?: string;
  loginRegisterHref: string;
}