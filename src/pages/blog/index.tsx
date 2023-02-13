import type { GetServerSideProps, NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import { ISiteLayout } from '../../models/common/layout';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import Blog from '../../components/site/blog/Blog';

interface IProps extends ISiteLayout {}

const BlogPage: NextPage<IProps> = ({
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
        <Blog />
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
