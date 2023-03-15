import type { GetServerSideProps, NextPage } from 'next';
import SiteLayout from '../components/site/layout/SiteLayout';
import { getSiteLayout } from '../lib/helpers/get-layout';
import { ISiteLayout } from '../models/common/layout';
import Contact from '../components/site/contact/Contact';

interface IProps extends ISiteLayout {}

const ContactPage: NextPage<IProps> = ({
  primaryMenuItems,
  secondaryMenuItems,
  siteName,
  siteDescription,
  siteURL,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={`${siteName} | Contact`}
        pageDescription={'Contact Form'}
        og={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/contact`,
        }}
        defaultMenuItemIndex={0}
        headerMenuItems={primaryMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
        siteFooterProps={{
          contactWidgetData,
          linksWidgetData,
          newsletterWidgetData,
        }}
      >
        <Contact />
      </SiteLayout>
    </>
  );
};

export default ContactPage;

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const siteLayout = await getSiteLayout();

    return {
      props: {
        ...siteLayout,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
