import { GetServerSideProps, NextPage } from 'next';
import { getCsrfToken } from 'next-auth/react';
import Login from '../../components/site/auth/Login';

interface IProps {
  csrfToken: string;
}

const LoginPage: NextPage<IProps> = ({ csrfToken }) => {
  return <Login csrfToken={csrfToken} />;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
};
