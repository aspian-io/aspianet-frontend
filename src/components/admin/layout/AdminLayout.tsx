import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import AdminFooter from './sub-components/AdminFooter';
import AdminHeader from './sub-components/AdminHeader';

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="p-2 md:p-4">
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminLayout;
