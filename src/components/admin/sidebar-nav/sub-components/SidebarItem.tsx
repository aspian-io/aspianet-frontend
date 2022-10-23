import Link from 'next/link';
import React, { useState } from 'react';
import { IAdminSideBarItem, IAdminSideBarItemProps } from '../admin-sidebar.types';
import SubItem from './SidebarSubItem';

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

Item.SubItem = SubItem;

export default Item;