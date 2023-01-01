import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import AdminFooter from './sub-components/AdminFooter';
import AdminHeader from './sub-components/AdminHeader';
import { useSelector } from 'react-redux';
import { getAdminLayoutState } from '../../../store/slices/admin/admin-layout-slice';
import TopBar from '../topbar/TopBar';

interface IProps {
  pageTitle: string;
  breadCrumbs: {
    label: string;
    href?: string;
  }[];
  topBarBackArrow?: boolean;
}

const AdminLayout: FC<PropsWithChildren<IProps>> = ({
  pageTitle,
  breadCrumbs,
  topBarBackArrow = true,
  children,
}) => {
  const { sidebar } = useSelector(getAdminLayoutState);
  const { sidebarSideLayoutCss } = sidebar;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="relative py-2 md:py-4 pr-4 pl-4 md:pl-8 min-h-screen bg-zinc-100 z-0">
        <AdminHeader />
        <div
          className={`${sidebarSideLayoutCss} rounded-3xl overflow-hidden transition-all duration-300 mb-10 min-h-[400px]`}
        >
          <TopBar
            title={pageTitle}
            breadCrumbs={breadCrumbs}
            backBtn={topBarBackArrow}
          />
          {children}
        </div>
        <div
          className={`${sidebarSideLayoutCss} absolute bottom-4 left-0 right-0 text-xs text-zinc-500`}
        >
          <AdminFooter />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
