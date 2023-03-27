import { AxiosError } from 'axios';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';
import SiteLayout from '../../components/site/layout/SiteLayout';
import NewsArticle from '../../components/site/news/NewsArticle';
import { PostAgent } from '../../lib/axios/agent';
import { getSiteLayout } from '../../lib/helpers/get-layout';
import { PostKeys } from '../../lib/swr/keys';
import { INestError } from '../../models/common/error';
import { ISiteLayout } from '../../models/common/layout';
import { IPost } from '../../models/posts/post';

interface IProps extends ISiteLayout {
  article: IPost;
}

const BlogArticlePage: NextPage<IProps> = ({
  primaryMenuItems,
  siteLogo,
  siteName,
  siteOverlayLogo,
  contactWidgetData,
  linksWidgetData,
  newsletterWidgetData,
  article,
}) => {
  const fetcher = () => PostAgent.newsNormalDetails(article.slug);

  const { data: articleLiveData, error } = useSWR<
    IPost | undefined,
    AxiosError<INestError>
  >(`${PostKeys.GET_NEWS_ARTICLE}/${article.slug}`, fetcher);

  return (
    <>
      <SiteLayout
        siteName={siteName}
        pageTitle={article.title}
        pageDescription={article.excerpt ?? ''}
        og={{
          type: 'article',
          url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/news/${article.slug}`,
          image: article.featuredImage
            ? `${article.featuredImage.key}`
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
        <NewsArticle article={article} articleLiveData={articleLiveData} />
      </SiteLayout>
    </>
  );
};

export default BlogArticlePage;

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
    const { data: article, status } = await PostAgent.newsDetails(slug);

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
          destination: `/news/${err.response.data.slug}`,
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
