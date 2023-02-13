import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { ILogoFile } from '../../../models/files/logo-file';
import { ITaxonomy } from '../../../models/taxonomies/taxonomy';
import SiteFooter, { ISiteFooterProps } from './sub-components/SiteFooter';
import SiteHeader from './sub-components/SiteHeader';

export interface ISiteLayoutProps {
  defaultMenuItemIndex?: number;
  headerMenuItems: ITaxonomy[];
  siteLogo?: ILogoFile;
  siteOverlayLogo?: ILogoFile;
  siteFooterProps?: ISiteFooterProps;
  container?: boolean;
}

const SiteLayout: FC<PropsWithChildren<ISiteLayoutProps>> = ({
  defaultMenuItemIndex,
  headerMenuItems,
  siteLogo,
  siteOverlayLogo,
  siteFooterProps,
  container = true,
  children,
}) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SiteHeader
        defaultMenuItemIndex={defaultMenuItemIndex}
        headerMenuItems={headerMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
      />
      <div className={`${container ? 'container mx-auto' : ''} font-sans`}>
        {children}
      </div>
      <SiteFooter {...siteFooterProps} />
    </>
  );
};

export default SiteLayout;
