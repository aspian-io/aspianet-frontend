import { AxiosError } from 'axios';
import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import useSWR from 'swr';
import { PostAgent } from '../../../lib/axios/agent';
import { PostKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { ILogoFile } from '../../../models/files/logo-file';
import { IMiniBanner } from '../../../models/posts/post';
import { ITaxonomy } from '../../../models/taxonomies/taxonomy';
import Banner from '../banner/Banner';
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
  const fetcher = () => PostAgent.bannersList();

  const { data: bannersData, error } = useSWR<
    IPaginated<IMiniBanner>,
    AxiosError<INestError>
  >(PostKeys.GET_BANNERS_LIST, fetcher);

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
            {og.image && (
              <meta
                property="og:image"
                content={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${og.image}`}
              />
            )}
          </>
        )}

        <meta
          name="theme-color"
          content="#8479E1"
          media="(prefers-color-scheme: light)"
        />
      </Head>
      {bannersData &&
        bannersData.items.length > 0 &&
        bannersData.items.map((b, i) => <Banner content={b.content} key={i} />)}

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
