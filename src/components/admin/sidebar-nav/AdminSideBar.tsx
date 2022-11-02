import React, { useEffect } from 'react';
import { IAdminSideBar, IAdminSideBarProps } from './admin-sidebar.types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminLayoutState,
  setBackDropCss,
  setMinimizeSidebarCss,
  setSidebarSideLayoutCss,
} from '../../../store/slices/admin/admin-layout-slice';
import SidebarUserArea from './sub-components/SidebarUserArea';
import SidebarLogo from './sub-components/SidebarLogo';
import Item from './sub-components/SidebarItem';
import Link from 'next/link';
import {
  SIDEBAR_HIDE_BACKDROP_CSS,
  SIDEBAR_HIDE_CSS,
  SIDEBAR_HIDE_SIDE_LAYOUT_CSS,
  SIDEBAR_SHOW_BACKDROP_CSS,
  SIDEBAR_SHOW_CSS,
  SIDEBAR_SHOW_SIDE_LAYOUT_CSS,
} from './constants';

const AdminSideBar: IAdminSideBar<IAdminSideBarProps> = ({
  logo,
  userPhotoSrc,
  username,
  userFirstName,
  userLastName,
  children,
}) => {
  const { sidebar } = useSelector(getAdminLayoutState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth >= 768) {
      dispatch(setBackDropCss(SIDEBAR_SHOW_BACKDROP_CSS));
      dispatch(setMinimizeSidebarCss(SIDEBAR_SHOW_CSS));
      dispatch(setSidebarSideLayoutCss(SIDEBAR_SHOW_SIDE_LAYOUT_CSS));
    } else {
      dispatch(setBackDropCss(SIDEBAR_HIDE_BACKDROP_CSS));
      dispatch(setMinimizeSidebarCss(SIDEBAR_HIDE_CSS));
      dispatch(setSidebarSideLayoutCss(SIDEBAR_HIDE_SIDE_LAYOUT_CSS));
    }
  }, [dispatch]);

  return (
    <>
      <div
        className={sidebar.backdropCss}
        onClick={(e) => {
          dispatch(setBackDropCss(SIDEBAR_HIDE_BACKDROP_CSS));
          dispatch(setMinimizeSidebarCss(SIDEBAR_HIDE_CSS));
          dispatch(setSidebarSideLayoutCss(SIDEBAR_HIDE_SIDE_LAYOUT_CSS));
        }}
      ></div>
      <div
        className={`fixed bottom-2 top-2 md:top-4 md:bottom-4 bg-gray-900 rounded-3xl overflow-hidden ${sidebar.minimizeSidebarCss} transition-all duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col w-64 h-full bg-gray-900 rounded-3xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="px-6 pt-8">
            <div className="flex items-center justify-between">
              <SidebarLogo src={logo.src} href={logo.href} />
              <button
                className="flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 text-light rtl:rotate-180"
                onClick={(e) => {
                  dispatch(setBackDropCss(SIDEBAR_HIDE_BACKDROP_CSS));
                  dispatch(setMinimizeSidebarCss(SIDEBAR_HIDE_CSS));
                  dispatch(
                    setSidebarSideLayoutCss(SIDEBAR_HIDE_SIDE_LAYOUT_CSS)
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 pt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full rounded-xl pl-8 px-4 py-2.5 text-xs font-light bg-gray-800 text-gray-400 placeholder-gray-500 border-0 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="px-6 py-4">
            <hr className="border-gray-700" />
          </div>

          {/* SideBar Items */}
          <div className="px-6 py-2 min-h-[150px] max-h-[calc(100vh-362px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 ltr:mr-2.5 rtl:ml-2.5">
            <ul className="flex flex-col space-y-2">{children}</ul>
          </div>

          <div className="flex flex-col mt-auto">
            <div className="px-6 pt-4">
              <hr className="border-gray-700" />
            </div>

            <div className="px-6 pt-4 pb-8">
              <ul className="flex flex-col space-y-2">
                <li>
                  <div className="relative text-gray-500 group">
                    <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-2 rtl:pr-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <Link href="/admin/settings">
                      <a className="inline-block w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-500">
                        Settings
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="relative text-gray-500 group">
                    <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center ltr:pl-2 rtl:pr-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                    </div>
                    <Link href="/admin/notifications">
                      <a className="inline-block w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500">
                        Notifications
                      </a>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            <SidebarUserArea
              userPhotoSrc={userPhotoSrc}
              userFirstName={userFirstName}
              userLastName={userLastName}
              signOutLabel="Logout"
              username={username}
              items={[
                {
                  label: 'Profile',
                  pathname: '/admin/profile',
                },
                {
                  label: 'Security',
                  pathname: '/admin/security',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

AdminSideBar.Item = Item;

export default AdminSideBar;
