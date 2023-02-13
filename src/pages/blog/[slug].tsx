import { AxiosError } from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';
import BlogArticle from '../../components/site/blog/BlogArticle';
import SiteLayout from '../../components/site/layout/SiteLayout';
import { PostAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { PostKeys } from '../../lib/swr/keys';
import { INestError } from '../../models/common/error';
import { ISiteLayout } from '../../models/common/layout';
import { IPost, IPostStat } from '../../models/posts/post';

interface IProps extends ISiteLayout {
  article: IPost;
}

const BlogArticlePage: NextPage<IProps> = ({
  primaryMenuItems,
  secondaryMenuItems,
  siteLogo,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  article,
}) => {
  const fetcher = () => PostAgent.blogStatistics(article.slug);

  const { data: statData, error } = useSWR<IPostStat, AxiosError<INestError>>(
    `${PostKeys.GET_BLOG_STAT}/${article.slug}`,
    fetcher
  );

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
        <BlogArticle article={article} statData={statData} />
      </SiteLayout>
    </>
  );
};

export default BlogArticlePage;

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
    const { data: article, status } = await PostAgent.blogDetails(slug);

    return {
      props: {
        ...siteLayout,
        article,
      },
    };
  } catch (error) {
    const err = error as AxiosError<IPost>;

    if (err.response?.status === 301) {
      return {
        redirect: {
          destination: `/blog/${err.response.data.slug}`,
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
