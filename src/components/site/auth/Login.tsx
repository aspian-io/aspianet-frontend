import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useId, FC } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { IUserLogin, UserLogin } from '../../../models/users/login';
import Button from '../../common/Button';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  IUserError,
  UserErrorsInternalCodeEnum,
} from '../../../models/users/auth-error';
import FormikInput from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';

interface IProps {
  csrfToken: string;
}

const Login: FC<IProps> = ({ csrfToken }) => {
  const { status } = useSession();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const initialValues: IUserLogin = new UserLogin();
  const toastId = useId();

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
    if (router.query['error']) {
      toast.error('Something went wrong', {
        toastId: toastId,
        className: 'bg-danger text-light',
      });
      router.push('/auth/login', undefined, { shallow: true });
    }
  }, [router, status, toastId]);

  if (status === 'authenticated') return <></>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(50, 'Email address should be less than 50 characters')
          .email('Invalid email address')
          .required('Please enter your email address'),
        password: Yup.string()
          .required('Please enter your password')
          .min(6, 'Password must be more than 6 characters')
          .max(50, 'Password address should be less than 50 characters'),
      })}
      onSubmit={async (values) => {
        if (!executeRecaptcha) {
          toast.error('Something went wrong', {
            className: 'bg-danger text-light text-sm',
          });
          return;
        }
        const reCaptchaToken = await executeRecaptcha('login');
        const res = await signIn('credentials', {
          redirect: false,
          username: values.username,
          password: values.password,
          recaptcha: reCaptchaToken,
        });
        if (res?.error) {
          const err = JSON.parse(res.error) as IUserError;
          if (err.statusCode === 401) {
            toast.error('Your username or password is incorrect', {
              className: 'bg-danger text-light text-sm',
            });
            return;
          }
          if (
            err.internalCode === UserErrorsInternalCodeEnum.INACTIVE_ACCOUNT
          ) {
            toast.error(
              'Your Account has not been activated. Redirecting to account activation page...',
              {
                className: 'bg-danger text-light text-sm',
              }
            );
            setTimeout(() => {
              router.push(`/auth/verify-email?email=${values.username}`);
            }, 5000);
            return;
          }
          if (
            err.internalCode === UserErrorsInternalCodeEnum.SUSPENDED_ACCOUNT
          ) {
            toast.error('Your Account has been suspended', {
              className: 'bg-danger text-light text-sm',
            });
            return;
          }
          toast.error('Something went wrong', {
            className: 'bg-danger text-light text-sm',
          });
          return;
        }
        setDone(true);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <fieldset disabled={isSubmitting || googleLoginLoading || done}>
            <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-primary to-light">
              <div className="flex flex-col sm:flex-row w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-light rounded-2xl">
                <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8 sm:w-3/4">
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
                        <span className="before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10"></span>
                        Login to Your Account
                      </h1>
                    </div>
                  </div>
                  <Field
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <div className="flex flex-col justify-center items-center w-full mt-6">
                    <Field
                      name="username"
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
                  <div className="flex justify-start self-start items-center mt-4">
                    <Link href="/auth/forget-password">
                      <a className="text-blue-600 text-xs hoverable:hover:underline">
                        Forget password?
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-center items-center w-full mt-10">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      type="submit"
                      variant="primary"
                      block
                      disabled={isSubmitting}
                      extraCSSClasses="flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="h-5 w-5" />
                      ) : (
                        'Login'
                      )}
                    </Button>
                  </div>
                  <div className="flex justify-center items-center w-full mt-4">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      type="button"
                      variant="danger"
                      block
                      disabled={isSubmitting || googleLoginLoading}
                      extraCSSClasses="flex justify-center items-center fill-light"
                      onClick={async (e) => {
                        setGoogleLoginLoading(true);
                        try {
                          await signIn('google', {
                            redirect: false,
                          });
                          setDone(true);
                        } catch (error) {
                          setGoogleLoginLoading(false);
                          toast.error('Something went wrong', {
                            className: 'bg-danger text-light',
                          });
                        }
                      }}
                    >
                      {googleLoginLoading ? (
                        <LoadingSpinner className="h-5 w-5" />
                      ) : (
                        <>
                          <svg
                            width="34px"
                            height="34px"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                          </svg>
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="flex w-full h-full items-end justify-center mt-4 sm:hidden">
                    <Link href="/auth/register">
                      <a className="w-full">
                        <Button
                          rounded="rounded-xl"
                          size="h-11"
                          type="button"
                          block
                          variant="primary-outline"
                          extraCSSClasses="text-sm"
                        >
                          Register
                        </Button>
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-center items-center mt-4 sm:mt-8">
                    <Link href="/">
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
                            Back
                          </span>
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="hidden sm:flex justify-center flex-col items-center sm:w-80 rounded-r-xl overflow-hidden relative">
                  <Image
                    src="/login-aside.jpg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                    alt="Site Logo"
                  />
                  <div className="h-full w-full bg-primary/60 z-10">
                    <div className="flex flex-col justify-start items-center h-full w-full px-8">
                      <h3 className="text-light text-lg font-bold pt-5 sm:pt-12">
                        Not registered yet?
                      </h3>
                      <p className="text-light text-sm mt-2 sm:mt-4 text-center">
                        Create your account to access all our services
                      </p>
                      <div className="flex w-full h-full items-end justify-center pb-8 mt-6 sm:pb-[6.2rem] sm:mt-auto">
                        <Link href="/auth/register">
                          <a className="w-full">
                            <Button
                              rounded="rounded-lg sm:rounded-xl"
                              size="h-9 sm:h-11"
                              type="button"
                              block
                              variant="light-outline"
                            >
                              Register
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
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

export default Login;
