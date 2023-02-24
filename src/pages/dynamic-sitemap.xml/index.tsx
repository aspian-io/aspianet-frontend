import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { PostTypeEnum } from '../../models/posts/admin/post';
import { IPostSitemap } from '../../models/posts/post';

export default function SitemapPage() {}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // throw new Error('Something went wrong')
  const { data: sitemapData } = await axios.get<IPostSitemap[]>(
    `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/posts/sitemap`
  );

  const fields: ISitemapField[] = sitemapData.map((sd) => {
    if (sd.type === PostTypeEnum.BLOG) {
      return {
        loc: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/blog/${sd.slug}`,
        lastmod: sd.updatedAt,
      };
    }

    if (sd.type === PostTypeEnum.NEWS) {
      return {
        loc: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/news/${sd.slug}`,
        lastmod: sd.updatedAt,
      };
    }

    if (sd.type === PostTypeEnum.PAGE) {
      return {
        loc: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pages/${sd.slug}`,
        lastmod: sd.updatedAt,
      };
    }

    if (sd.type === PostTypeEnum.PROJECT) {
      return {
        loc: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/portfolio/${sd.slug}`,
        lastmod: sd.updatedAt,
      };
    }

    return { loc: `${process.env.NEXT_PUBLIC_APP_BASE_URL}` };
  });

  return getServerSideSitemap(context, fields);
};
