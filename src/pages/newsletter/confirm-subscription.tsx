import { Field, Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import Button from '../../components/common/Button';
import Image from 'next/image';
import { AuthAgent, NewsletterAgent } from '../../lib/axios/agent';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FormikInput from '../../components/common/FormikInput';
import { useTimer } from '../../hooks/common/useTimer';
import { imgPlaceholderDataURL } from '../../lib/helpers/img-placeholder';
import {
  ISubscriberOtp,
  SubscriberOtp,
  SubscriptionTokenDto,
} from '../../models/newsletter/subscribers/subscriber-dto';

interface IProps {
  email: string;
  remainingTime: number;
}

const ConfirmSubscriptionPage: NextPage<IProps> = ({
  email,
  remainingTime,
}) => {
  const [resendLoading, setResendLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const { timer, timerMinutes, timerSeconds } = useTimer(remainingTime);
  const initialValues: ISubscriberOtp = new SubscriberOtp({ email, token: '' });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        token: Yup.number()
          .min(100000, 'Verification token is a six-digit number')
          .max(999999, 'Verification token is a six-digit number')
          .required('Please enter verification token'),
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          await NewsletterAgent.confirmSubscription(
            new SubscriptionTokenDto({
              email: values.email,
              token: +values.token,
            })
          );
          resetForm();
          setDone(true);
          toast.success(
            'Your subscription confirmed successfully. Redirecting to the homepage ...',
            {
              className: 'bg-success text-light',
            }
          );
          setTimeout(() => {
            router.push('/');
          }, 5000);
        } catch (error) {
          console.log(error);
          toast.error('Token is expired or incorrect.', {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <fieldset disabled={isSubmitting || done}>
            <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-primary to-light">
              <div className="flex bg-light rounded-2xl w-80 md:w-96">
                <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 px-8 w-full">
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
                      <h1 className="text-dark sm:text-xl mt-2">
                        <span className="absolute before:absolute before:w-8 before:h-8 sm:before:w-9 sm:before:h-9 before:rounded-lg before:bg-primary-light/30 before:-left-5 before:-top-2 sm:before:-left-6 sm:before:-top-2 before:-z-10"></span>
                        Confirm your subscription
                      </h1>
                      <p className="text-dark text-xs sm:text-sm mt-8 text-left">
                        Pleas enter the verification token that has been sent to
                        your email to confirm your subscription.
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full mt-4">
                    <Field
                      name="token"
                      placeholder="Enter Your Token Here..."
                      labelClassName="hidden"
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

                  <div className="flex justify-center items-center w-full mt-10">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      variant="primary"
                      type="submit"
                      block={true}
                      extraCSSClasses="text-sm sm:text-base flex justify-center items-center"
                      disabled={timer <= 0 || values.token.length !== 6 || done}
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="w-6 h-6" />
                      ) : (
                        'Confirm Subscription'
                      )}
                    </Button>
                  </div>

                  <div className="flex justify-center items-center mt-4 sm:mt-6">
                    <Link href="/" className="flex items-center justify-center">
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

export default ConfirmSubscriptionPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query['email']) throw new Error('Email must be supplied');

  try {
    const remainingTimeObj = await NewsletterAgent.tokenRemainingTime(
      context.query['email'] as string
    );

    return {
      props: {
        email: context.query['email'],
        remainingTime: remainingTimeObj.remainingTimeInSec,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
