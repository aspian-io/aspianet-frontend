import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../../common/Button";
import Input, { InputTypeEnum } from "../../common/Input";

const Register = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-gradient-to-bl from-primary to-light'>
      <div className='flex flex-col sm:flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-light rounded-2xl'>
        <div className='hidden sm:flex justify-center flex-col items-center sm:w-80 rounded-l-xl overflow-hidden relative'>
          <Image
            src='/login-aside.jpg'
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            priority
            alt='Site Logo'
          />
          <div className='h-full w-full bg-primary/60 z-10'>
            <div className='flex flex-col justify-start items-center h-full w-full px-8'>
              <h3 className='text-light font-bold sm:pt-28 text-center '>
                Already have an account?
              </h3>
              <div className='flex w-full h-full items-end justify-center pb-8 mt-6 sm:pb-[6.2rem] sm:mt-auto'>
                <Link href='/login'>
                  <a className='w-full'>
                    <Button
                      rounded='rounded-xl'
                      size='h-9 sm:h-11'
                      type='button'
                      block
                      variant='light-outline'
                    >
                      Login
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8 sm:w-3/4'>
          <div className='flex justify-center items-center w-48 h-14 relative'>
            <Image
              src='/nav-logo.svg'
              layout='fill'
              objectFit='contain'
              objectPosition='center'
              priority
              alt='Site Logo'
            />
          </div>
          <div className='flex justify-center items-center w-full my-5'>
            <div className='relative text-center'>
              <h1 className='text-dark sm:text-xl'>
                <span className='before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10'></span>
                Create your account
              </h1>
            </div>
          </div>
          <div className='flex space-x-4 w-full mt-6'>
            <Input
              placeholderText='First Name'
              rounded='rounded-xl'
              size='h-11'
              block
              type={InputTypeEnum.text}
              extraCSSClasses='text-xs sm:text-sm'
            />
            <Input
              placeholderText='Last Name'
              rounded='rounded-xl'
              size='h-11'
              block
              type={InputTypeEnum.text}
              extraCSSClasses='text-xs sm:text-sm'
            />
          </div>
          <div className='flex justify-center items-center w-full mt-6'>
            <Input
              placeholderText='Email Address'
              rounded='rounded-xl'
              size='h-11'
              block
              type={InputTypeEnum.email}
              extraCSSClasses='text-xs sm:text-sm'
            />
          </div>
          <div className='flex justify-center items-center w-full mt-4 sm:mt-6'>
            <Input
              placeholderText='Password'
              rounded='rounded-xl'
              size='h-11'
              block
              type={InputTypeEnum.password}
              extraCSSClasses='text-xs sm:text-sm'
            />
          </div>
          <div className='flex justify-center items-center w-full mt-10 sm:mt-10'>
            <Button
              rounded='rounded-xl'
              size='h-11'
              variant='primary'
              type='submit'
              block={true}
              extraCSSClasses='text-sm sm:text-base'
            >
              Register
            </Button>
          </div>
          <div className='flex w-full h-full items-end justify-center mt-4 sm:pb-[6.2rem] sm:mt-auto sm:hidden'>
            <Link href='/login'>
              <a className='w-full'>
                <Button
                  rounded='rounded-xl'
                  size='h-11'
                  type='button'
                  block
                  variant='primary-outline'
                  extraCSSClasses='text-sm'
                >
                  Login
                </Button>
              </a>
            </Link>
          </div>
          <div className='flex justify-center items-center mt-4 sm:mt-8'>
            <Link href='/'>
              <a className='flex items-center justify-center'>
                <Button
                  rounded='rounded-xl'
                  size='h-11'
                  variant='link'
                  type='button'
                  extraCSSClasses='flex text-primary'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 sm:w-6 sm:h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                    />
                  </svg>

                  <span className='ml-1 sm:ml-2 text-sm sm:text-base'>
                    Back
                  </span>
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
