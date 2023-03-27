import type { GetServerSideProps, NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import { ISiteLayout } from '../../models/common/layout';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import News from '../../components/site/news/News';

interface IProps extends ISiteLayout {}

const BlogPage: NextPage<IProps> = ({
  primaryMenuItems,
  siteLogo,
  siteName,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={`${siteName} | News`}
        pageDescription={'List of all news'}
        og={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/news`,
          image: siteLogo?.key
        }}
        defaultMenuItemIndex={1}
        headerMenuItems={primaryMenuItems}
        siteLogo={siteLogo}
        siteOverlayLogo={siteOverlayLogo}
        siteFooterProps={{
          contactWidgetData,
          linksWidgetData,
          newsletterWidgetData,
        }}
      >
        <News />
      </SiteLayout>
    </>
  );
};

export default BlogPage;

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
        statusCode: 500,
      },
    };
  }
};
