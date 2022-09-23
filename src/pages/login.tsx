import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/common/Button';

interface IProps {
  csrfToken: string;
}

const LoginPage: NextPage<IProps> = ({ csrfToken }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        // validationSchema={Yup.object({
        //   username: Yup.string()
        //     .max(30, 'Must be 30 characters or less')
        //     .email('Invalid email address')
        //     .required('Please enter your email'),
        //   password: Yup.string().required('Please enter your password'),
        // })}
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Submitting');
          const res = await signIn('credentials', {
            redirect: false,
            username: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });
          if (res?.error) {
            console.log('RES Error: ', res.error);
            setError(res.error);
          } else {
            console.log('NO ERROR');
            setError(null);
          }
          if (res?.url) router.push(res.url);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <div className="flex justify-center items-center w-full mt-6">
                    <Field
                      name="email"
                      placeholder="Email Address"
                      aria-required="true"
                      type="text"
                      className="block w-full bg-zinc-100 placeholder-zinc-400 text-zinc-800 border-0 focus:border-2 focus:border-primary focus:bg-light h-11 rounded-xl text-xs sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-center items-center w-full mt-4 sm:mt-6">
                    <Field
                      name="password"
                      placeholder="Password"
                      aria-required="true"
                      type="password"
                      className="block w-full bg-zinc-100 placeholder-zinc-400 text-zinc-800 border-0 focus:border-2 focus:border-primary focus:bg-light h-11 rounded-xl text-xs sm:text-sm"
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
                      className="block w-full text-primary-accent bg-primary hoverable:hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark rounded-xl h-11 text-sm sm:text-base"
                    >
                      Login
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
          </form>
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
