import React, { FC } from 'react';

export interface ISiteNavHamburgerBtnProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

const SiteNavHamburgerBtn: FC<ISiteNavHamburgerBtnProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const openCss = isOpen
    ? 'transform-gpu rotate-90 -translate-x-1 -translate-y-1'
    : '';
  const openCssHamburgerTop = isOpen
    ? 'transform-gpu rotate-45 translate-y-2 bg-light'
    : 'bg-primary';
  const openCssHamburgerMiddle = isOpen ? 'hidden' : '';
  const openCssHamburgerBottom = isOpen
    ? 'transform-gpu -rotate-45 -translate-y-2 bg-light'
    : 'bg-primary';

  return (
    <div
      className={`flex flex-row-reverse lg:hidden cursor-pointer w-7 relative focus:outline-none focus:bg-light`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:outline-none cursor-pointer z-30 w-7 h-6 transition-transform duration-500 ${openCss}`}
      >
        <span
          className={`absolute w-7 h-1 top-0 right-0 rounded-sm transition-transform duration-500 ${openCssHamburgerTop}`}
        ></span>
        <span
          className={`absolute w-7 h-1 top-2 right-0 bg-primary rounded-sm transition-transform duration-500 ${openCssHamburgerMiddle}`}
        ></span>
        <span
          className={`absolute w-7 h-1 top-4 right-0 rounded-sm transition-transform duration-500 ${openCssHamburgerBottom}`}
        ></span>
      </button>
    </div>
  );
};

export default SiteNavHamburgerBtn;
