import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '../../components/common/Button';
import Image from 'next/image';
import * as Yup from 'yup';
import { INestError } from '../../models/common/error';
import { AuthAgent } from '../../lib/agent';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ForgetPasswordPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') router.push('/');
  }, [router, status]);

  if (status === 'authenticated') return <></>;

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .max(50, 'Email address should be less than 50 characters')
          .email('Invalid email address')
          .required('Please enter your email address'),
      })}
      onSubmit={async ({ email }) => {
        try {
          await AuthAgent.resetPasswordRequest(email);
          setDone(true);
          router.push(`/auth/reset-password?email=${email}`);
        } catch (error) {
          const err = error as AxiosError<INestError>;
          if (err.response?.data.statusCode === 404) {
            toast.error('Email address not found', {
              className: 'bg-danger text-light',
            });
            return;
          }
          if (err.response?.data.statusCode === 400) {
            toast.error('Please enter a valid email address', {
              className: 'bg-danger text-light',
            });
            return;
          }

          toast.error('Something went wrong', {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({ errors, touched, setSubmitting, isSubmitting, values }) => (
        <Form>
          <fieldset disabled={isSubmitting || done}>
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
                    </div>
                  </div>
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
                  <div className="flex flex-col justify-center items-center w-full mt-8 mb-6">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      variant="primary"
                      type="submit"
                      block
                      extraCSSClasses="text-sm sm:text-base flex justify-center items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="w-6 h-6" />
                      ) : (
                        'Next'
                      )}
                    </Button>
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

export default ForgetPasswordPage;
