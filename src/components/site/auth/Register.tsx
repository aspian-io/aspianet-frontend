import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { IUserRegister, UserRegister } from '../../../models/auth/register';
import Button from '../../common/Button';
import * as Yup from 'yup';
import { AuthAgent } from '../../../lib/axios/agent';
import { AxiosError } from 'axios';
import { INestError } from '../../../models/common/error';
import { toast } from 'react-toastify';
import FormikInput from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Register = () => {
  const { status } = useSession();
  const router = useRouter();
  const initialValues: IUserRegister = new UserRegister();
  const [done, setDone] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [router, status]);

  if (status === 'authenticated') return <></>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(30, 'First name should be less than 30 characters')
          .required('Please enter your first name'),
        lastName: Yup.string()
          .max(30, 'Last name should be less than 30 characters')
          .required('Please enter your last name'),
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
      })}
      onSubmit={async (userInfo) => {
        try {
          if (!executeRecaptcha) {
            toast.error('Something went wrong', {
              className: 'bg-danger text-light text-sm',
            });
            return;
          }
          const reCaptchaToken = await executeRecaptcha('register');
          const user = await AuthAgent.register(userInfo, reCaptchaToken);
          setDone(true);
          router.push(`/auth/verify-email?email=${user.email}`);
        } catch (error) {
          const err = error as AxiosError<INestError>;
          toast.error(err.response?.data.message, {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <fieldset disabled={isSubmitting || done}>
            <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-bl from-primary to-light">
              <div className="flex flex-col sm:flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-light rounded-2xl">
                <div className="hidden sm:flex justify-center flex-col items-center sm:w-80 rounded-l-xl overflow-hidden relative">
                  <Image
                    src="/login-aside.jpg"
                    fill
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt="Site Logo"
                  />
                  <div className="h-full w-full bg-primary/60 z-10">
                    <div className="flex flex-col justify-start items-center h-full w-full px-8">
                      <h3 className="text-light font-bold sm:pt-28 text-center ">
                        Already have an account?
                      </h3>
                      <div className="flex w-full h-full items-end justify-center pb-8 mt-6 sm:pb-[6.2rem] sm:mt-auto">
                        <Link href="/auth/login" className="w-full">
                          <Button
                            rounded="rounded-xl"
                            size="h-9 sm:h-11"
                            type="button"
                            block
                            variant="light-outline"
                          >
                            Login
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8 sm:w-3/4">
                  <div className="flex justify-center items-center w-48 h-14 relative">
                    <Image
                      src="/nav-logo.svg"
                      fill
                      placeholder="blur"
                      blurDataURL={imgPlaceholderDataURL}
                      priority
                      alt="Site Logo"
                    />
                  </div>
                  <div className="flex justify-center items-center w-full my-5">
                    <div className="relative text-center">
                      <h1 className="text-dark sm:text-xl">
                        <span className="before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10"></span>
                        Create your account
                      </h1>
                    </div>
                  </div>
                  <div className="flex w-full mt-6">
                    <div className="flex flex-col justify-center items-center w-1/2 pr-4">
                      <Field
                        name="firstName"
                        placeholder="First Name"
                        aria-required="true"
                        type="text"
                        component={FormikInput}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center w-1/2">
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        aria-required="true"
                        type="text"
                        component={FormikInput}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full mt-6">
                    <Field
                      name="email"
                      placeholder="Email Address"
                      aria-required="true"
                      type="text"
                      component={FormikInput}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full mt-4 sm:mt-6">
                    <Field
                      name="password"
                      placeholder="Password"
                      aria-required="true"
                      type="password"
                      component={FormikInput}
                    />
                  </div>
                  <div className="text-zinc-400 text-xs self-start mt-6">
                    This site is protected by reCAPTCHA and the Google&nbsp;
                    <Link
                      href="https://policies.google.com/privacy"
                      className="text-blue-400"
                    >
                      Privacy Policy
                    </Link>
                    &nbsp;and&nbsp;
                    <Link
                      href="https://policies.google.com/terms"
                      className="text-blue-400"
                    >
                      Terms of Service
                    </Link>
                    &nbsp;apply.
                  </div>
                  <div className="flex justify-center items-center w-full mt-2">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      variant="primary"
                      type="submit"
                      block={true}
                      extraCSSClasses="flex justify-center items-center text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="w-6 h-6" />
                      ) : (
                        'Register'
                      )}
                    </Button>
                  </div>
                  <div className="flex w-full h-full items-end justify-center mt-4 sm:pb-[6.2rem] sm:mt-auto sm:hidden">
                    <Link href="/auth/login" className="w-full">
                      <Button
                        rounded="rounded-xl"
                        size="h-11"
                        type="button"
                        block
                        variant="primary-outline"
                        extraCSSClasses="text-sm"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                  <div className="flex justify-center items-center mt-4 sm:mt-8">
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

                      <span className="ml-1 sm:ml-2 text-sm sm:text-base">
                        Back
                      </span>
                    </Button>
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

export default Register;
