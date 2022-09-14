import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";
import AdminFooter from "./sub-components/AdminFooter";
import AdminHeader from "./sub-components/AdminHeader";
import { useSelector } from "react-redux";
import { getAdminLayoutState } from "../../../store/slices/admin/admin-layout-slice";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  const { sidebar } = useSelector(getAdminLayoutState);
  const { sidebarSideLayoutCss } = sidebar;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="p-2 md:p-4">
        <AdminHeader />
        <div
          className={`bg-primary ${sidebarSideLayoutCss}  h-screen rounded-3xl overflow-hidden transition-all duration-300`}
        >
          {children}
        </div>
        <AdminFooter />
      </div>
    </>
  );
};

export default AdminLayout;
