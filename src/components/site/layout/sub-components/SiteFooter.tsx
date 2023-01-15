import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import Button from '../../../common/Button';

const SiteFooter = () => {
  return (
    <div className="bg-zinc-100 w-full">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full py-20 px-4 space-y-14">
          <div className="flex flex-col justify-center items-start w-full md:w-1/3">
            <div className="relative w-44 h-12 rounded-t-3xl overflow-hidden">
              <Image
                src="/nav-logo.svg"
                fill
                style={{
                  position: 'absolute',
                  left: 0,
                }}
                sizes="(max-width: 24rem) 100vw"
                placeholder="blur"
                blurDataURL={imgPlaceholderDataURL}
                alt={'Site Logo'}
              />
            </div>
            <div className="text-zinc-500 text-sm mt-4">
              <span className="font-bold mr-2">Address: </span>
              <span>Vakilabad Blv, Mashhad, Razavi Khorasan, Iran</span>
            </div>

            <div className="text-zinc-500 text-sm mt-4">
              <span className="font-bold mr-2">Phone: </span>
              <span>+985138883344</span>
            </div>
            <div className="text-zinc-500 text-sm">
              <span className="font-bold mr-2">Fax: </span>
              <span>+985138883333</span>
            </div>
          </div>
          <div className="flex flex-col justify-start h-full items-start w-full md:w-1/3">
            <h5 className="text-dark font-bold text-base h-12 mb-4">
              Important Links
            </h5>
            <Link href="#" className="text-zinc-500 text-sm">
              Terms & conditions
            </Link>
            <Link href="#" className="text-zinc-500 text-sm">
              FAQ
            </Link>
            <Link href="#" className="text-zinc-500 text-sm">
              Partnership
            </Link>
          </div>
          <div className="flex flex-col justify-start h-full items-start w-full md:w-1/3">
            <h5 className="text-dark font-bold text-base h-12 mb-4">
              Newsletter
            </h5>
            <div className="text-zinc-500 text-sm mb-10">
              You can subscribe to our newsletter to get our latest articles.
            </div>
            <Button
              rounded="rounded-lg"
              size="h-8"
              type="button"
              variant="primary"
              onClick={() => {}}
              extraCSSClasses="text-sm px-4"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center border-t-2 border-light px-4 py-6 space-y-1">
        <div className="flex justify-center items-center text-zinc-400 text-xs">
          <span className="mr-1">Made with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-danger"
          >
            <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
          </svg>
          <span className="ml-1">Omid Rouhani</span>
        </div>
        <div className="flex justify-center items-center text-zinc-400 text-xs">
          <span className="mr-1">Copyright</span>
          <span>ASPIANET</span>
          <span className="ml-1">{new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
};

export default SiteFooter;
