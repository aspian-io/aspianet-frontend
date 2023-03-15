import type { GetServerSideProps, NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import Portfolio from '../../components/site/portfolio/Portfolio';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { ISiteLayout } from '../../models/common/layout';

interface IProps extends ISiteLayout {}

const PortfolioPage: NextPage<IProps> = ({
  primaryMenuItems,
  siteName,
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
        pageTitle={`${siteName} | Portfolio`}
        pageDescription={'List of all projects'}
        og={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/portfolio`,
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
        container={false}
      >
        <Portfolio />
      </SiteLayout>
    </>
  );
};

export default PortfolioPage;

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
