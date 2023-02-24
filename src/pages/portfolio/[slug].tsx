import { AxiosError } from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import BlogArticle from '../../components/site/blog/BlogArticle';
import SiteLayout from '../../components/site/layout/SiteLayout';
import PortfolioDetails from '../../components/site/portfolio/PortfolioDetails';
import { PostAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { ISiteLayout } from '../../models/common/layout';
import { IPost } from '../../models/posts/post';

interface IProps extends ISiteLayout {
  project: IPost;
}

const PortfolioDetailsPage: NextPage<IProps> = ({
  primaryMenuItems,
  siteName,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  project,
}) => {
  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={project.title}
        pageDescription={project.excerpt ?? ''}
        og={{
          type: 'article',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/portfolio/${project.slug}`,
          image: project.featuredImage
            ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${project.featuredImage}`
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
        <PortfolioDetails project={project} />
      </SiteLayout>
    </>
  );
};

export default PortfolioDetailsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'abc' } }],
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
    const { data: project, status } = await PostAgent.projectDetails(slug);

    return {
      props: {
        ...siteLayout,
        project,
      },
    };
  } catch (error) {
    const err = error as AxiosError<IPost>;

    if (err.response?.status === 301) {
      return {
        redirect: {
          destination: `/portfolio/${err.response.data.slug}`,
          statusCode: 301,
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
