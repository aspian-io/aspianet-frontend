import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import '../locales/i18n';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={14 * 60}
      refetchOnWindowFocus={true}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
