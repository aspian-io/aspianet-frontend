import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { signIn, getCsrfToken, useSession } from 'next-auth/react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { toast } from 'react-toastify';

interface IProps {
  csrfToken: string;
}

const LoginPage: NextPage<IProps> = ({ csrfToken }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [router, status]);

  if (status === 'authenticated') return <></>;

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(50, 'Email address should be less than 50 characters')
            .email('Invalid email address')
            .required('Please enter your email address'),
          password: Yup.string()
            .required('Please enter your password')
            .min(6, 'Password must be more than 6 characters')
            .max(50, 'Password address should be less than 50 characters'),
        })}
        onSubmit={async (values) => {
          const res = await signIn('credentials', {
            redirect: false,
            username: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });
          if (res?.error) {
            toast.error(res.error, {
              className: 'bg-danger text-light',
            });
          }
          if (res?.url) router.push(res.url);
        }}
      >
        {({ errors, touched, setSubmitting, isSubmitting }) => (
          <Form>
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
                      name="email"
                      placeholder="Email Address"
                      aria-required="true"
                      type="text"
                      className={`block w-full bg-zinc-100 
                      placeholder-zinc-400 text-zinc-800 
                        border-0 
                        ${
                          errors.email && touched.email
                            ? 'border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                            : 'focus:border-2 focus:border-primary focus:bg-light'
                        } 
                        h-11 rounded-xl text-xs sm:text-sm`}
                    />
                    <ErrorMessage
                      name="email"
                      className="mt-2 text-danger text-xs"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full mt-4 sm:mt-6">
                    <Field
                      name="password"
                      placeholder="Password"
                      aria-required="true"
                      type="password"
                      className={`block w-full bg-zinc-100 
                                placeholder-zinc-400 text-zinc-800 
                                  border-0 
                                  ${
                                    errors.password && touched.password
                                      ? 'border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                                      : 'focus:border-2 focus:border-primary focus:bg-light'
                                  } 
                                  h-11 rounded-xl text-xs sm:text-sm`}
                    />
                    <ErrorMessage
                      name="password"
                      className="mt-2 text-danger text-xs"
                      component="div"
                    />
                  </div>
                  <div className="flex justify-start self-start items-center mt-4">
                    <Link href="/forget-password">
                      <a className="text-blue-600 text-xs hoverable:hover:underline">
                        Forget password?
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-center items-center w-full mt-10">
                    <button
                      type="submit"
                      className="flex justify-center items-center w-full text-primary-accent bg-primary hoverable:hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark rounded-xl h-11 text-sm sm:text-base disabled:bg-primary-light disabled:hoverable:hover:bg-primary-light"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="h-5 w-5" />
                      ) : (
                        'Login'
                      )}
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-full mt-4">
                    <button
                      type="button"
                      className="flex justify-center items-center w-full text-light bg-danger hoverable:hover:bg-danger-dark focus:ring-2 focus:ring-offset-2 focus:ring-danger-dark rounded-xl h-11 text-sm sm:text-base disabled:bg-danger-light disabled:hoverable:hover:bg-danger-light fill-light"
                      onClick={async () => {
                        setSubmitting(true);
                        const res = await signIn('google', {
                          redirect: false,
                          callbackUrl: `${window.location.origin}`,
                        });
                        if (res?.error) {
                          toast.error(res.error, {
                            className: 'bg-danger text-light',
                          });
                        }
                        if (res?.url) router.push(res.url);
                        setSubmitting(false);
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
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
                    </button>
                  </div>
                  <div className="flex w-full h-full items-end justify-center mt-4 sm:hidden">
                    <Link href="/register">
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
                        <Link href="/register">
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginPage;

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
