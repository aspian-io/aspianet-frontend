import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import { ILogoFile } from '../../../models/files/logo-file';
import { ITaxonomy } from '../../../models/taxonomies/taxonomy';
import SiteFooter, { ISiteFooterProps } from './sub-components/SiteFooter';
import SiteHeader from './sub-components/SiteHeader';

export interface ISiteLayoutProps {
  siteName: string;
  pageTitle?: string;
  pageDescription: string;
  pageKeywords?: string[];
  defaultMenuItemIndex?: number;
  headerMenuItems: ITaxonomy[];
  siteLogo?: ILogoFile;
  siteOverlayLogo?: ILogoFile;
  siteFooterProps?: ISiteFooterProps;
  container?: boolean;
  og?: {
    type: 'website' | 'article';
    url: string;
    image?: string;
  };
}

const SiteLayout: FC<PropsWithChildren<ISiteLayoutProps>> = ({
  siteName,
  pageTitle,
  pageDescription,
  pageKeywords,
  defaultMenuItemIndex,
  headerMenuItems,
  siteLogo,
  siteOverlayLogo,
  siteFooterProps,
  container = true,
  og,
  children,
}) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {pageKeywords && (
          <meta name="keywords" content={pageKeywords.join(', ')} />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {og && (
          <>
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={og.type} />
            <meta property="og:url" content={og.url} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            {og.image && <meta property="og:image" content={og.image} />}
          </>
        )}

        <meta
          name="theme-color"
          content="#8479E1"
          media="(prefers-color-scheme: light)"
        />
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
