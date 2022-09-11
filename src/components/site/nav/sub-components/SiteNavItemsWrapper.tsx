import React, { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { getLayoutState } from '../../../../store/slices/layout-slice';

export interface ISiteNavItemsWrapperProps {
  isOpen: boolean;
}

const SiteNavItemsWrapper: FC<PropsWithChildren<ISiteNavItemsWrapperProps>> = ({
  isOpen,
  children,
}) => {
  const { siteNav } = useSelector(getLayoutState);
  const { isSearchOpen } = siteNav;

  return (
    <div
      className={`${
        isSearchOpen
          ? 'w-0 grow-0 opacity-0 scale-0'
          : 'lg:opacity-100 lg:w-auto delay-200'
      } ${
        isOpen ? 'fixed' : 'hidden'
      } lg:overflow-hidden lg:justify-center grow inset-0 z-20 flex flex-col items-center self-end w-full h-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-light uppercase divide-y divide-primary-dark divide-dashed bg-primary opacity-90 transition-all duration-75 ease-linear lg:min-h-fit lg:bg-light lg:divide-y-0 lg:capitalize lg:py-2 lg:self-center lg:tracking-normal lg:flex lg:flex-row lg:space-x-8 lg:text-zinc-500`}
    >
      {children}
    </div>
  );
};

export default SiteNavItemsWrapper;
