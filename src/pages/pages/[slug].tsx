import { AxiosError } from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import SiteLayout from '../../components/site/layout/SiteLayout';
import SitePage from '../../components/site/page/SitePage';
import { PostAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { ISiteLayout } from '../../models/common/layout';
import { IPost } from '../../models/posts/post';

interface IProps extends ISiteLayout {
  page: IPost;
}

const PageDetailsPage: NextPage<IProps> = ({
  primaryMenuItems,
  siteName,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  page,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={page.title}
        pageDescription={page.excerpt ?? ''}
        og={{
          type: 'article',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/${page.slug}`,
          image: page.featuredImage
            ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${page.featuredImage}`
            : undefined,
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
        <SitePage page={page} />
      </SiteLayout>
    </>
  );
};

export default PageDetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
  try {
    const siteLayout = await getSiteLayout();
    const slug = params?.slug as string;
    if (!slug) {
      return {
        notFound: true,
      };
    }
    const { data: page, status } = await PostAgent.pageDetails(slug);

    return {
      props: {
        ...siteLayout,
        page,
      },
    };
  } catch (error) {
    const err = error as AxiosError<IPost>;

    if (err.response?.status === 301) {
      return {
        redirect: {
          destination: `/pages/${err.response.data.slug}`,
          permanent: true,
        },
      };
    }

    if (err.response?.status === 404) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
