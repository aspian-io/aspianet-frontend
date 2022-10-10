import React, { FC } from 'react';
import Link from 'next/link';
import Button from '../../../common/Button';

export interface ISiteNavAuthBtnProps {
  responsive: boolean;
  loginRegisterHref: string;
  loginRegisterLabel?: string;
}

const SiteNavAuthBtn: FC<ISiteNavAuthBtnProps> = ({
  responsive,
  loginRegisterHref,
  loginRegisterLabel,
}) => {
  return (
    <div>
      {!responsive && (
        <Link href={loginRegisterHref} passHref>
          <a className="space-x-1 pl-5 flex flex-row">
            <Button
              rounded="rounded-lg"
              size="h-11"
              variant="primary-outline"
              type="button"
              extraCSSClasses='px-2'
            >
              <div className="flex flex-row space-x-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                <span className="hidden md:flex items-center">
                  {loginRegisterLabel}
                </span>
              </div>
            </Button>
          </a>
        </Link>
      )}
      {responsive && (
        <Link href={loginRegisterHref} passHref>
          <a>
            <Button
              rounded="rounded-lg"
              size="h-8"
              variant="primary"
              type="button"
              extraCSSClasses="px-2"
            >
              <div className="flex flex-row text-sm text-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </Button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default SiteNavAuthBtn;
