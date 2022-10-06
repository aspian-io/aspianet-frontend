import 'react-toastify/dist/ReactToastify.min.css';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store, useAppDispatch } from '../store/store';
import '../locales/i18n';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      NProgress.start();
    });

    router.events.on('routeChangeComplete', (url) => {
      NProgress.done(false);
    });

    router.events.on('routeChangeError', (url) => {
      NProgress.done(false);
    });
  }, [router.events]);

  return (
    <SessionProvider
      session={session}
      refetchInterval={14 * 60}
      refetchOnWindowFocus={true}
    >
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          limit={3}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
