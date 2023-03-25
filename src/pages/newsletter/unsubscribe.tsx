import { NextPage } from 'next';
import Head from 'next/head';
import Unsubscribe from '../../components/site/newsletter/unsubscribe';

const UnsubscribePage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Newsletter Cancel Subscription</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Unsubscribe />
    </>
  );
};

export default UnsubscribePage;
