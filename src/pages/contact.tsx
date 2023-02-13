import type { GetStaticProps, NextPage } from 'next';
import SiteLayout from '../components/site/layout/SiteLayout';
import { getSiteLayout } from '../lib/helpers/get-layout';
import { ISiteLayout } from '../models/common/layout';
import Contact from '../components/site/contact/Contact';

interface IProps extends ISiteLayout {}

const ContactPage: NextPage<IProps> = ({
  primaryMenuItems,
  secondaryMenuItems,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
}) => {
  return (
    <>
      <SiteLayout
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

export const getStaticProps: GetStaticProps<IProps> = async () => {
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
