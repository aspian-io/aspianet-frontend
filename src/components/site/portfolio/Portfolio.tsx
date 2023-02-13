import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import { PostAgent } from '../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { PostKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { IMiniPost } from '../../../models/posts/post';
import Button from '../../common/Button';
import Loading from '../../common/Loading';
import Pagination from '../post/sub-components/Pagination';
import PortfolioCategories from './sub-components/PortfolioCategories';

const Portfolio = () => {
  const router = useRouter();
  // const [order, setOrder] = useState<'latest' | 'top'>('latest');
  // const orderQs = useCallback(
  //   () =>
  //     order === 'top' ? 'orderBy.likesNum=DESC' : 'orderBy.createdAt=DESC',
  //   [order]
  // );

  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : undefined;

  const fetcher = () =>
    PostAgent.projectsList(
      qs ? `${qs}&orderBy.createdAt=DESC` : `?orderBy.createdAt=DESC`
    );

  const { data: projectsData, error } = useSWR<
    IPaginated<IMiniPost>,
    AxiosError<INestError>
  >(
    `${PostKeys.GET_PROJECTS_LIST}${
      qs ? `${qs}&orderBy.createdAt=DESC` : `?orderBy.createdAt=DESC`
    }`,
    fetcher
  );

  if (error) router.push('/500');
  if (!projectsData) return <Loading />;

  return (
    <div className="bg-primary-light/20">
      <div className="flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h3 className="text-primary text-sm">Portfolio</h3>
          <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">Our</span>
            <span className="text-primary">&nbsp;Projects</span>
          </h3>
        </div>

        <div className="flex flex-wrap justify-center items-center space-x-4 mt-20">
          <Button
            rounded="rounded-xl"
            size="h-10"
            type="button"
            variant={
              !router.query['filterBy.projectCategory']
                ? 'primary'
                : 'primary-outline'
            }
            extraCSSClasses="min-w-[5rem] sm:min-w-[6rem] px-4 text-base sm:text-lg mb-3"
            onClick={() => {
              delete router.query['filterBy.projectCategory'];
              router.push(router);
            }}
          >
            All
          </Button>
          {<PortfolioCategories />}
        </div>

        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-stretch items-stretch gap-8 relative min-h-[20rem] sm:min-h-[20rem] w-full mt-16">
          {projectsData.items.length > 0 &&
            projectsData.items.map((p, i) => (
              <div
                className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300"
                key={i}
              >
                {p.featuredImage && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${p.featuredImage.key}`}
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={p.featuredImage.imageAlt ?? 'Portfolio Photo'}
                  />
                )}
                {!p.featuredImage && (
                  <div className="flex justify-center items-center w-full h-full bg-primary text-light/50 text-lg font-bold">
                    No Photo
                  </div>
                )}
                <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
                  <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                    {p.title}
                  </h3>
                  <Button
                    rounded="rounded-lg"
                    size="h-7 hoverable:h-9"
                    type="button"
                    variant="success"
                    onClick={() => {
                      router.push(`/portfolio/${p.slug}`);
                    }}
                    extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center items center w-full mt-20">
          <Pagination
            currentPage={projectsData.meta.currentPage}
            totalPages={projectsData.meta.totalPages}
            baseUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/portfolio`}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
