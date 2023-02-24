import { NextPage } from 'next';
import Head from 'next/head';
import ForgetPassword from '../../components/site/auth/ForgetPassword';

const ForgetPasswordPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ForgetPassword />
    </>
  );
};

export default ForgetPasswordPage;
