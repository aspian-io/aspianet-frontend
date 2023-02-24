import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { getCsrfToken } from 'next-auth/react';
import Login from '../../components/site/auth/Login';

interface IProps {
  csrfToken: string;
}

const LoginPage: NextPage<IProps> = ({ csrfToken }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Login csrfToken={csrfToken} />
    </>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
