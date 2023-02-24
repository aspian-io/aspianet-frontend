import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { AxiosError } from 'axios';
import { INestError } from '../../models/common/error';
import { AuthAgent } from '../../lib/axios/agent';
import ResetPassword from '../../components/site/auth/ResetPassword';

interface IProps {
  email: string;
  remainingTime: number;
}

const ResetPasswordPage: NextPage<IProps> = ({ email, remainingTime }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ResetPassword email={email} remainingTime={remainingTime} />
    </>
  );
};

export default ResetPasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query['email']) throw new Error('Email must be supplied');

  try {
    const remainingTimeObj = await AuthAgent.resetPasswordRemainingTime(
      context.query['email'] as string
    );

    return {
      props: {
        email: context.query['email'],
        remainingTime: remainingTimeObj.remainingTimeInSec,
      },
    };
  } catch (error) {
    const err = error as AxiosError<INestError>;
    if (
      err.response?.data.statusCode === 403 ||
      err.response?.data.statusCode === 400
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    throw new Error('Something went wrong');
  }
};
