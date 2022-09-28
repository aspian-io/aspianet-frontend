import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, memo, useCallback } from 'react';
import Button from '../../common/Button';
import Input, { InputTypeEnum } from '../../common/Input';
import OtpInput from './OtpInput';

const ResetPassword = () => {
  const [timer, setTimer] = useState(120);

  const getRemainingMinutes = useCallback(
    (seconds: number) => {
      const mins = Math.floor(timer / 60);
      return String(mins).padStart(2, '0');
    },
    [timer]
  );

  const getRemainingSeconds = useCallback(
    (seconds: number) => {
      const sec = timer - Math.floor(timer / 60) * 60;
      return String(sec).padStart(2, '0')
    },
    [timer]
  );

  const [timerMinutes, setTimerMinutes] = useState(getRemainingMinutes(timer));
  const [timerSeconds, setTimerSeconds] = useState(getRemainingSeconds(timer));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
      setTimerMinutes(getRemainingMinutes(timer));
      setTimerSeconds(getRemainingSeconds(timer));
    }, 1000);

    if (timer < 0) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [getRemainingMinutes, getRemainingSeconds, timer]);


  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-primary to-light">
      <div className="flex bg-light rounded-2xl w-80 md:w-96">
        <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8 w-full">
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

          <div className="relative w-full mt-10">
            <OtpInput extraCssClasses="text-xs sm:text-sm" />
            <div className="py-1 w-16 text-center rounded-lg text-primary text-sm mt-4 absolute right-2 -top-3.5">
              <Button
                type="button"
                variant={timer > 0 ? 'link' : 'primary'}
                size="h-8"
                rounded="rounded-lg"
                disabled={timer > 0 ? true : false}
                extraCSSClasses="text-sm"
              >
                {timer > 0 ? <h6 className='font-semibold'>{`${timerMinutes} : ${timerSeconds}`}</h6> : 'Resend'}
              </Button>
            </div>
          </div>

          <div className="flex justify-center items-center w-full mt-6">
            <Input
              placeholderText="New Password"
              rounded="rounded-xl"
              size="h-11"
              block
              type={InputTypeEnum.password}
              extraCSSClasses="text-xs sm:text-sm"
            />
          </div>

          <div className="flex justify-center items-center w-full mt-10">
            <Button
              rounded="rounded-xl"
              size="h-11"
              variant="primary"
              type="submit"
              block={true}
              extraCSSClasses="text-sm sm:text-base"
            >
              Reset Password
            </Button>
          </div>

          <div className="flex justify-center items-center mt-4 sm:mt-6">
            <Link href="/login">
              <a className="flex items-center justify-center">
                <Button
                  rounded="rounded-xl"
                  size="h-11"
                  variant="link"
                  type="button"
                  extraCSSClasses="flex text-primary"
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

                  <span className="ml-1 sm:ml-2 text-sm sm:text-base">
                    Back to login
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

export default memo(ResetPassword);
