import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import SiteFooter from './sub-components/SiteFooter';
import SiteHeader from './sub-components/SiteHeader';

const SiteLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SiteHeader />
      <div className="font-sans">{children}</div>
      <SiteFooter />
    </>
  );
};

export default SiteLayout;
