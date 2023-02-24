import { NextPage } from 'next';
import Head from 'next/head';
import Register from '../../components/site/auth/Register';

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Register />
    </>
  );
};

export default RegisterPage;
