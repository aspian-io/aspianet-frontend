import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

export interface ISiteNavLogoProps {
  isOpen: boolean;
  logoSrc: string;
  overlayLogoSrc: string;
}

const SiteNavLogo: FC<ISiteNavLogoProps> = ({
  isOpen,
  logoSrc,
  overlayLogoSrc,
}) => {
  return (
    <>
      <div
        className={`${
          isOpen ? 'hidden' : ''
        } w-1/2 h-10 lg:flex lg:w-52 lg:h-24 relative`}
      >
        <Link href={process.env.NEXT_PUBLIC_APP_BASE_URL!}>
          <a>
            <Image
              className="mx-auto z-20"
              src={logoSrc}
              layout="fill"
              objectFit="contain"
              objectPosition="left center"
              priority
              alt="Site Logo"
            />
          </a>
        </Link>
      </div>
      <div
        className={`${isOpen ? '' : 'hidden'} w-1/2 h-10 lg:hidden relative`}
      >
        <Image
          className="mx-auto z-30"
          src={overlayLogoSrc}
          layout="fill"
          objectFit="contain"
          objectPosition="left center"
          priority
          alt="Site Logo"
        />
      </div>
    </>
  );
};

export default SiteNavLogo;
