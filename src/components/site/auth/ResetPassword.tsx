import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, FC } from 'react';
import { useTimer } from '../../../hooks/common/useTimer';
import {
  IUserResetPasswordOtp,
  UserResetPasswordOtp,
} from '../../../models/users/otp';
import Button from '../../common/Button';
import * as Yup from 'yup';
import { AuthAgent } from '../../../lib/agent';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { INestError } from '../../../models/common/error';
import FormikInput from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';

interface IProps {
  email: string;
  remainingTime: number;
}

const ResetPassword: FC<IProps> = ({email, remainingTime}) => {
  const [resendLoading, setResendLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { status } = useSession();
  const { timer, timerMinutes, timerSeconds } = useTimer(remainingTime);
  const router = useRouter();
  const initialValues: IUserResetPasswordOtp = new UserResetPasswordOtp({
    email,
    password: '',
    token: '',
  });

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [router, status]);

  if (status === 'authenticated') return <></>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(50, 'Email address should be less than 50 characters')
          .email('Invalid email address')
          .required('Please enter your email address'),
        password: Yup.string()
          .required('Please enter your password')
          .min(6, 'Password must be more than 6 characters')
          .max(50, 'Password address should be less than 50 characters')
          .matches(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            'Password must have lowercase characters, uppercase characters, numbers or symbols'
          ),
        token: Yup.number()
          .min(100000, 'Verification token is a six-digit number')
          .max(999999, 'Verification token is a six-digit number')
          .required('Please enter verification token'),
      })}
      onSubmit={async ({ email, password, token }, { resetForm }) => {
        try {
          await AuthAgent.resetPassword(email, password, +token);
          resetForm();
          setDone(true);
          toast.success(
            'Your password has been reset successfully. Redirecting to the login page ...',
            {
              className: 'bg-success text-light',
            }
          );
          setTimeout(() => {
            router.push('/auth/login');
          }, 5000);
        } catch (error) {
          const err = error as AxiosError<INestError>;
          console.log(err.response?.data);
          toast.error('Token is expired or incorrect.', {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <fieldset disabled={isSubmitting || done}>
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
                  <div className="flex flex-col justify-center items-center w-full my-5">
                    <h1 className="text-dark sm:text-xl">
                      <span className="absolute before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10"></span>
                      Reset Password
                    </h1>
                    <p className="text-dark text-sm mt-6 self-start">
                      Please fill out the form by using the token that has been
                      sent to your email.
                    </p>
                  </div>
                  <div className="relative w-full mt-4">
                    <Field
                      name="token"
                      placeholder="Enter Your Token Here..."
                      minLength={6}
                      maxLength={6}
                      aria-required="true"
                      type="text"
                      disabled={timer <= 0 || done}
                      component={FormikInput}
                    />
                    <div className="flex justify-center items-center py-1 w-16 text-center rounded-lg text-primary text-sm mt-4 absolute right-2 -top-3.5">
                      {resendLoading ? (
                        <LoadingSpinner className="h-4 w-4 mt-2 ml-4" />
                      ) : (
                        <Button
                          type="button"
                          variant={timer > 0 ? 'link' : 'primary'}
                          size="h-8"
                          onClick={async (e) => {
                            setResendLoading(true);
                            try {
                              await AuthAgent.resendVerificationToken(email);
                              router.reload();
                              setResendLoading(false);
                            } catch (error) {
                              setResendLoading(false);
                              toast.error('Something went wrong', {
                                className: 'bg-danger text-light',
                              });
                            }
                          }}
                          rounded="rounded-lg"
                          disabled={timer > 0 || done}
                          extraCSSClasses="text-sm"
                        >
                          {timer > 0 ? (
                            <h6 className="font-semibold">{`${timerMinutes} : ${timerSeconds}`}</h6>
                          ) : (
                            'Resend'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center w-full mt-6">
                    <Field
                      name="password"
                      placeholder="New Password"
                      aria-required="true"
                      type="password"
                      component={FormikInput}
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
                    <Link href="/auth/login">
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
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
