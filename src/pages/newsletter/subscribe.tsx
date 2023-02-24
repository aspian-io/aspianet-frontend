import { NextPage } from 'next';
import Head from 'next/head';
import Subscribe from '../../components/site/newsletter/subscribe';

const SubscribePage: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Newsletter Subscription</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Subscribe />
    </>
  );
};

export default SubscribePage;
