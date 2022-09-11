import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const AdminSideBar = () => {
  const { t } = useTranslation('common');

  return (
    <div className="fixed f-screen bottom-2 top-2 md:top-4 md:bottom-4 bg-gray-900 rounded-3xl overflow-hidden">
      <div className="flex flex-col w-64 h-full bg-gray-900 rounded-3xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="p-1.5 rounded-xl flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <div className="relative w-24 h-7">
                <Image
                  src="/nav-logo.svg"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  alt="Logo"
                />
              </div>
            </a>
            <button className="flex items-center justify-center p-0.5 rounded bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 stroke-light"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
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

        <div className="px-6 pt-4">
          <hr className="border-gray-700" />
        </div>

        <div className="px-6 py-4 min-h-[150px] max-h-[calc(100vh - 362px)] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 mr-2.5">
          <ul className="flex flex-col space-y-2">
            <li>
              <div className="relative text-gray-500 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                >
                  {t('appName')}
                </a>
              </div>
            </li>

            <li>
              <div className="relative text-gray-500 flex justify-between items-center group">
                <div className="flex items-center w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <a
                    href="#"
                    className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light transition-all duration-500"
                  >
                    Content
                  </a>
                </div>
                <button
                  className="absolute right-0 p-1 flex items-center"
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
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="pt-2 pl-4">
                <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                  <li>
                    <a
                      href="#"
                      className="inline-block w-full px-4 py-2 text-xs rounded-xl hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                    >
                      Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block w-full px-4 py-2 text-xs rounded-xl hover:bg-gray-800 hoverable:hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block w-full px-4 py-2 text-xs rounded-xl hover:bg-gray-800 hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                    >
                      Instructors
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="inline-block w-full px-4 py-2 text-xs rounded-xl hover:bg-gray-800 hover:text-light focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light transition-all duration-500"
                    >
                      Video Library
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <div className="relative text-gray-500 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                >
                  Design
                </a>
              </div>
            </li>

            <li>
              <div className="relative text-gray-500 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                >
                  Market & Sell
                </a>
              </div>
            </li>

            <li>
              <div className="relative text-gray-500 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.75 9zm4-1.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                >
                  Reporting
                </a>
              </div>
            </li>

            <li>
              <div className="relative text-gray-500 group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.171 4.146l1.947 2.466a3.514 3.514 0 011.764 0l1.947-2.466a6.52 6.52 0 00-5.658 0zm8.683 3.025l-2.466 1.947c.15.578.15 1.186 0 1.764l2.466 1.947a6.52 6.52 0 000-5.658zm-3.025 8.683l-1.947-2.466c-.578.15-1.186.15-1.764 0l-1.947 2.466a6.52 6.52 0 005.658 0zM4.146 12.83l2.466-1.947a3.514 3.514 0 010-1.764L4.146 7.171a6.52 6.52 0 000 5.658zM5.63 3.297a8.01 8.01 0 018.738 0 8.031 8.031 0 012.334 2.334 8.01 8.01 0 010 8.738 8.033 8.033 0 01-2.334 2.334 8.01 8.01 0 01-8.738 0 8.032 8.032 0 01-2.334-2.334 8.01 8.01 0 010-8.738A8.03 8.03 0 015.63 3.297zm5.198 4.882a2.008 2.008 0 00-2.243.407 1.994 1.994 0 00-.407 2.243 1.993 1.993 0 00.992.992 2.008 2.008 0 002.243-.407c.176-.175.31-.374.407-.585a2.008 2.008 0 00-.407-2.243 1.993 1.993 0 00-.585-.407z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <a
                  href="#"
                  className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                >
                  Support
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-auto">
          <div className="px-6 pt-4">
            <hr className="border-gray-700" />
          </div>

          <div className="px-6 pt-4 pb-8">
            <ul className="flex flex-col space-y-2">
              <li>
                <div className="relative text-gray-500 group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <a
                    href="#"
                    className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                  >
                    Settings
                  </a>
                </div>
              </li>
              <li>
                <div className="relative text-gray-500 group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <a
                    href="#"
                    className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                  >
                    Notifications
                  </a>
                </div>
              </li>
              <li>
                <div className="relative text-gray-500 group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hoverable:group-hover:text-primary-dark group-focus-within:text-primary-dark transition-all duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.111 11.89A5.5 5.5 0 1115.501 8 .75.75 0 1017 8a7 7 0 10-11.95 4.95.75.75 0 001.06-1.06zm2.121-5.658a2.5 2.5 0 000 3.536.75.75 0 11-1.06 1.06A4 4 0 1114 8a.75.75 0 01-1.5 0 2.5 2.5 0 00-4.268-1.768zm2.534 1.279a.75.75 0 00-1.37.364l-.492 6.861a.75.75 0 001.204.65l1.043-.799.985 3.678a.75.75 0 001.45-.388l-.978-3.646 1.292.204a.75.75 0 00.74-1.16l-3.874-5.764z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <a
                    href="#"
                    className="inline-block w-full pl-9 pr-4 py-2 text-xs hover:bg-gray-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800 hoverable:group-hover:text-light group-focus-within:text-light  transition-all duration-500"
                  >
                    Apps
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="pl-6 pr-4 py-4 bg-gray-800 flex items-center justify-between bottom-0 rounded-b-3xl">
            <div className="flex items-center">
              <div className="relative w-8 h-8 rounded-full before:absolute before:w-2 before:h-2 before:bg-success before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-light before:z-10">
                <Image
                  className="rounded-full"
                  src="/staff3.jpg"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt="User Photo"
                />
              </div>
              <div className="flex flex-col pl-3">
                <div className="text-sm text-gray-50">Jane Doe</div>
                <span className="text-xs text-gray-400 font-light tracking-tight">
                  janedoe@gmail.com
                </span>
              </div>
            </div>
            <button className="text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
