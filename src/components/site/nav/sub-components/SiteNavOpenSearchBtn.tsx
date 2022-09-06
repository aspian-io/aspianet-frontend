import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLayoutState,
  setIsSearchOpen,
} from '../../../../store/slices/layout-slice';

const SiteNavOpenSearchBtn = () => {
  const { siteNav } = useSelector(getLayoutState);
  const { isSearchOpen } = siteNav;
  const dispatch = useDispatch();

  return (
    <button
      className={`pr-4 ${
        isSearchOpen
          ? 'opacity-0 w-0 h-0 pr-0'
          : 'transition-all duration-300 delay-200 opacity-100 w-auto h-auto'
      } `}
      onClick={() => dispatch(setIsSearchOpen(true))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  );
};

export default SiteNavOpenSearchBtn;
