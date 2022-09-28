import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Button from '../../common/Button';
import Input, { InputTypeEnum } from '../../common/Input';

const ForgetPassword = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-primary to-light">
      <div className="flex flex-col w-11/12 sm:w-3/4 md:w-1/2 xl:w-1/3 bg-light rounded-2xl">
        <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8">
          <div className="flex justify-center items-center w-48 h-14 relative">
            <Image
              src="/nav-logo.svg"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              priority
              alt="Site Logo"
            />
          </div>
          <div className="flex justify-center items-center w-full my-5">
            <div className="relative text-center">
              <h1 className="text-dark sm:text-xl">
                <span className="absolute before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10"></span>
                Trouble Logging In?
              </h1>
              <p className="text-dark text-sm mt-8 sm:mt-8 text-center">
                Enter your email
              </p>
              <span className="text-dark text-sm text-center">
                and well send you a code to get you back into your account.
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mt-6">
            <Input
              placeholderText="Email Address"
              rounded="rounded-xl"
              size="h-11"
              block
              type={InputTypeEnum.email}
              extraCSSClasses="text-xs sm:text-sm"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full mt-8">
            <Link href="/reset-password">
              <a className="flex w-full pb-6">
                <Button
                  rounded="rounded-xl"
                  size="h-11"
                  variant="primary"
                  type="submit"
                  block
                  extraCSSClasses="text-sm sm:text-base"
                >
                  Send Email
                </Button>
              </a>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Button
              rounded="rounded-xl"
              size="h-11"
              variant="link"
              type="button"
              extraCSSClasses="flex text-primary"
              onClick={(e) => router.push('/auth/login')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 sm:w-6 sm:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span className="ml-1 sm:ml-2 text-sm sm:text-base">Back</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
