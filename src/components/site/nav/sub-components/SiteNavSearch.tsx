import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLayoutState,
  setIsSearchOpen,
} from '../../../../store/slices/layout-slice';

export interface ISiteNavSearchProps {
  responsive: boolean;
  searchPlaceholderLabel: string;
}

const SiteNavSearch: FC<ISiteNavSearchProps> = ({
  responsive,
  searchPlaceholderLabel,
}) => {
  const { siteNav } = useSelector(getLayoutState);
  const { isSearchOpen } = siteNav;
  const dispatch = useDispatch();

  const searchWrapperResponsiveCss =
    'items-center flex justify-start flex-row bg-light pr-2 w-full relative transition-all ease-linear duration-200';

  const searchWrapperNormalCss = `${
    isSearchOpen ? 'opacity-100' : 'opacity-0 w-0 px-0 overflow-hidden'
  } items-center flex justify-center flex-row bg-light px-4 w-full relative transition-all ease-linear duration-200`;

  const searchWrapperCss = responsive
    ? searchWrapperResponsiveCss
    : searchWrapperNormalCss;

  return (
    <div className={searchWrapperCss}>
      {/* <Input
        placeholderText={searchPlaceholderLabel}
        rounded="rounded-lg"
        size={responsive ? 'h-8' : 'h-11'}
        type={InputTypeEnum.text}
        block
        extraCSSClasses={
          responsive ? 'pr-11 placeholder:text-sm text-sm' : 'pr-12'
        }
      /> */}
      {!responsive && (
        <button
          type="button"
          className={`${
            !isSearchOpen && 'hidden'
          } absolute right-4 h-full text-center px-4 rounded-r-lg`}
          onClick={() => dispatch(setIsSearchOpen(false))}
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      {responsive && (
        <button
          type="button"
          className="absolute right-1 h-full text-center px-4 rounded-r-lg text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SiteNavSearch;
