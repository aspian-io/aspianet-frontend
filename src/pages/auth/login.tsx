import { GetServerSideProps, NextPage } from 'next';
import { getCsrfToken } from 'next-auth/react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Login from '../../components/site/auth/Login';

interface IProps {
  csrfToken: string;
}

const LoginPage: NextPage<IProps> = ({ csrfToken }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      <Login csrfToken={csrfToken} />
    </GoogleReCaptchaProvider>
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
