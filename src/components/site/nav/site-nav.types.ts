import { FC, PropsWithChildren } from 'react';
import { ILogoFile } from '../../../models/files/logo-file';

// Site Navigation Menu Type
export interface ISiteNav<P> extends FC<PropsWithChildren<P>> {
  Item: FC<PropsWithChildren<INavItemProps>>;
}

// Navigation Menu Item Component Props Type
export interface INavItemProps {
  href: string;
  isActive: boolean;
  onClick?: ( e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => any;
}

// Site Navigation Menu Props Type
export interface ISiteNavProps {
  logo?: ILogoFile;
  overlayLogo?: ILogoFile;
  loginRegisterLabel?: string;
  loginRegisterHref: string;
}