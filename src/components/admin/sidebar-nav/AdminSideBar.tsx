import React, { FC, PropsWithChildren, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  IAdminSideBar,
  IAdminSideBarItem,
  IAdminSideBarItemProps,
  IAdminSideBarLogoProps,
  IAdminSideBarProps,
  IAdminSideBarSubItemProps,
} from './admin-sidebar.types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminLayoutState,
  setDisplaySidebarBtnCss,
  setMinimizeSidebarCss,
  setSidebarSideLayoutCss,
} from '../../../store/slices/admin/admin-layout-slice';

// Admin Sidebar Component
const AdminSideBar: IAdminSideBar<IAdminSideBarProps> = ({
  logo,
  userPhotoSrc,
  username,
  userFirstName,
  userLastName,
  children,
}) => {
  const { t } = useTranslation('sidebar');
  const [backdropCss, setBackDropCss] = useState(
    'fixed inset-0 h-0 w-0 md:hidden md:h-0 md:w-0'
  );
  const [userTabOpen, setUSerTabOpen] = useState(false);
  const { sidebar } = useSelector(getAdminLayoutState);
  const dispatch = useDispatch();

  const sidebarDisplayModeCss1 =
    'ltr:left-2 ltr:md:left-4 rtl:right-2 rtl:md:right-4';
  const sidebarDisplayModeCss2 = 'ltr:-left-[300px] rtl:-right-[300px]';

  return (
    <>
      <div
        className={backdropCss}
        onClick={(e) => {
          setBackDropCss('hidden inset-0 h-0 w-0 md:hidden md:h-0 md:w-0');
          dispatch(setMinimizeSidebarCss(sidebarDisplayModeCss2));
          dispatch(
            setDisplaySidebarBtnCss(
              'transition-all duration-300 opacity-1 z-10 delay-300'
            )
          );
          dispatch(setSidebarSideLayoutCss('w-full'));
        }}
      ></div>
      <div
        className={`fixed bottom-2 top-2 md:top-4 md:bottom-4 bg-gray-900 rounded-3xl overflow-hidden ${sidebar.minimizeSidebarCss} transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col w-64 h-full bg-gray-900 rounded-3xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="px-6 pt-8">
            <div className="flex items-center justify-between">
              <Logo src={logo.src} href={logo.href} />
              <button
                className="flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 text-light rtl:rotate-180"
                onClick={(e) => {
                  setBackDropCss(
                    'hidden inset-0 h-0 w-0 bg-dark/50 md:hidden md:h-0 md:w-0'
                  );
                  dispatch(setMinimizeSidebarCss(sidebarDisplayModeCss2));
                  dispatch(
                    setDisplaySidebarBtnCss(
                      'transition-all duration-300 opacity-1 z-10 delay-300'
                    )
                  );
                  dispatch(setSidebarSideLayoutCss('w-full'));
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
                placeholder={t('search')}
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
                    <a
                      href="#"
                      className="inline-block w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                    >
                      {t('settings')}
                    </a>
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
                    <a
                      href="#"
                      className="inline-block w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                    >
                      {t('notifications')}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="py-4 bg-gray-800 flex flex-col items-start justify-center bottom-0 rounded-b-3xl">
              <div className="flex justify-between items-center w-full pl-6 pr-8">
                <div className="flex items-center">
                  <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-success before:rounded-full ltr:before:right-0 rtl:before:left-0 before:bottom-0 before:ring-1 before:ring-light before:z-10">
                    {userPhotoSrc ? (
                      <Image
                        className="rounded-full"
                        src={userPhotoSrc}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="User Photo"
                      />
                    ) : (
                      <div className="flex justify-center items-center absolute w-full h-full bg-primary text-light rounded-full">
                        {userFirstName[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col ltr:pl-3 rtl:pr-3">
                    <div className="text-sm text-gray-50">
                      {userFirstName} {userLastName}
                    </div>
                    <span className="text-xs text-gray-400 font-light tracking-tight">
                      {username}
                    </span>
                  </div>
                </div>
                <button
                  className={`text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light ${
                    userTabOpen ? '-rotate-90' : 'ltr:rotate-0 rtl:rotate-180'
                  } transition-transform duration-300`}
                  onClick={(e) => setUSerTabOpen(!userTabOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-start items-center w-full">
                <div
                  className={`flex flex-col justify-center pt-8 pb-8 overflow-hidden ${
                    userTabOpen ? 'max-h-40' : 'max-h-0 pt-0 pb-0'
                  } w-full transition-all duration-300`}
                >
                  <div
                    className={`flex flex-col text-gray-500 ltr:pl-14 rtl:pr-14 space-y-1 px-10`}
                  >
                    <div>
                      <a
                        href="#"
                        className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                      >
                        {t('profile')}
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                      >
                        {t('security')}
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                      >
                        {t('bookmarks')}
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                      >
                        {t('logout')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`${sidebar.displaySidebarBtnCss} flex items-center justify-center fixed top-12 ltr:left-10 rtl:right-10 p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 text-light`}
        onClick={(e) => {
          setBackDropCss(
            'fixed inset-0 h-screen w-screen md:hidden md:h-0 md:w-0'
          );
          dispatch(
            setDisplaySidebarBtnCss(
              'opacity-0 -z-10 transition-all duration-300'
            )
          );
          dispatch(setMinimizeSidebarCss(sidebarDisplayModeCss1));
          dispatch(
            setSidebarSideLayoutCss(
              'w-full md:w-[calc(100%-272px)] ltr:md:ml-[272px] rtl:md:mr-[272px]'
            )
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
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};

// Logo Component
const Logo: FC<IAdminSideBarLogoProps> = ({ src, href }) => {
  return (
    <Link href={href}>
      <a className="p-1.5 rounded-xl flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
        <div className="relative w-24 h-7">
          <Image
            src={src}
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            alt="Logo"
            priority
          />
        </div>
      </a>
    </Link>
  );
};

// Item Component
const Item: IAdminSideBarItem<IAdminSideBarItemProps> = ({
  hasSubItems = false,
  itemIcon,
  itemTitle,
  itemHref,
  children,
}) => {
  const [tabOpen, setTabOpen] = useState(false);

  return (
    <li>
      <div className="relative text-gray-500 flex justify-between items-center group">
        <div
          className="flex items-center w-full"
          onClick={(e) => setTabOpen(!tabOpen)}
        >
          <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center px-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-300">
            {itemIcon}
          </div>
          {!itemHref ? (
            <div className="inline-block cursor-pointer w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hoverable:group-hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-500">
              {itemTitle}
            </div>
          ) : (
            <Link href={itemHref!}>
              <a className="inline-block cursor-pointer w-full ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4 py-2 text-xs hoverable:group-hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-500">
                {itemTitle}
              </a>
            </Link>
          )}
        </div>
        {hasSubItems && (
          <button
            className={`absolute ltr:right-0 rtl:left-0 p-1 flex items-center ${
              tabOpen ? '-rotate-90' : 'rotate-0'
            } transition-transform duration-300`}
            onClick={(e) => setTabOpen(!tabOpen)}
            tabIndex={-1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {hasSubItems && (
        <div
          className={`pt-2 ltr:pl-4 rtl:pr-4 overflow-hidden ${
            tabOpen ? 'max-h-40' : 'max-h-0'
          } transition-all duration-300`}
        >
          <div
            className={`flex flex-col p-2 text-gray-500 space-y-1 ltr:border-l rtl:border-r border-gray-700`}
          >
            {children}
          </div>
        </div>
      )}
    </li>
  );
};

AdminSideBar.Item = Item;

// SubItem Component
const SubItem: FC<PropsWithChildren<IAdminSideBarSubItemProps>> = ({
  href,
  children,
}) => {
  return (
    <div>
      <Link href={href}>
        <a className="inline-block w-full px-4 py-2 text-xs rounded-xl hoverable:hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 focus:text-light transition-all duration-500">
          {children}
        </a>
      </Link>
    </div>
  );
};

Item.SubItem = SubItem;

export default AdminSideBar;
