import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { ILogoFile } from '../../../../models/files/logo-file';

export interface ISiteNavLogoProps {
  isOpen: boolean;
  logo?: ILogoFile;
  overlayLogo?: ILogoFile;
}

const SiteNavLogo: FC<ISiteNavLogoProps> = ({ isOpen, logo, overlayLogo }) => {
  const getSiteLogoSrc = () => {
    if (logo) {
      return `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${logo.key}`;
    }
    return '';
  };

  const getSiteOverlayLogoSrc = () => {
    if (overlayLogo) {
      return `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${overlayLogo.key}`;
    }
    return null;
  };

  return (
    <>
      {logo && (
        <Link
          href={process.env.NEXT_PUBLIC_APP_BASE_URL!}
          className={`${
            isOpen ? 'hidden' : ''
          } w-36 h-10 lg:flex lg:w-52 lg:h-24 relative`}
        >
          <Image
            className="z-20"
            src={getSiteLogoSrc()}
            fill
            sizes="(max-width: 210px) 25vw"
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            priority
            alt={logo?.imageAlt ?? 'Site Logo'}
          />
        </Link>
      )}
      <div
        className={`${isOpen ? '' : 'hidden'} w-36 h-10 lg:hidden relative`}
      >
        {logo && (
          <Image
            className="z-30"
            src={getSiteOverlayLogoSrc() ?? getSiteLogoSrc()}
            fill
            sizes="(max-width: 210px) 25vw"
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            priority
            alt={overlayLogo?.imageAlt ?? 'Site Logo'}
          />
        )}
      </div>
    </>
  );
};

export default SiteNavLogo;
