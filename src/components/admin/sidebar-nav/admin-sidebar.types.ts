import { FC, PropsWithChildren } from 'react';

export interface IAdminSideBar<P> extends FC<PropsWithChildren<P>> {
  Item: IAdminSideBarItem<IAdminSideBarItemProps>;
}

export interface IAdminSideBarProps {
  logo: IAdminSideBarLogoProps;
  userPhotoSrc?: string;
  username: string;
  userFirstName: string;
  userLastName: string;
}

export interface IAdminSideBarLogoProps {
  src: string;
  href: string;
}

export interface IAdminSideBarItem<P> extends FC<PropsWithChildren<P>> {
  SubItem: FC<PropsWithChildren<IAdminSideBarSubItemProps>>;
}

export interface IAdminSideBarItemProps {
  itemIcon: JSX.Element;
  itemTitle: string;
  itemHref?: string;
  hasSubItems?: boolean;
}

export interface IAdminSideBarSubItemProps {
  href: string;
}