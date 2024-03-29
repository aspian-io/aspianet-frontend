import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { imgPlaceholderDataURL } from '../../lib/helpers/img-placeholder';

const NextAuthErrorPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-zinc-100">
        <div className="flex items-center justify-center w-full h-20 divide-x-2 divide-primary-light px-4">
          <Link
            href="/"
            className="relative w-16 sm:w-20 h-full flex items-center justify-center mr-5"
          >
            <Image
              src="/only-logo.svg"
              fill
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              alt="logo"
              priority
            />
          </Link>
          <div className="flex flex-col h-full items-center justify-center pl-5">
            <div className="text-primary text-md sm:text-xl">
              Something went wrong
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextAuthErrorPage;
