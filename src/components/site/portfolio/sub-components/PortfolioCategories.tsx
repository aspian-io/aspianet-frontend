import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { TaxonomyAgent } from '../../../../lib/axios/agent';
import { TaxonomyKeys } from '../../../../lib/swr/keys';
import { INestError } from '../../../../models/common/error';
import { IPaginated } from '../../../../models/common/paginated-result';
import { ITaxonomy } from '../../../../models/taxonomies/taxonomy';
import Button from '../../../common/Button';
import Loading from '../../../common/Loading';

const PortfolioCategories = () => {
  const router = useRouter();

  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : undefined;

  const fetcher = () =>
    TaxonomyAgent.projectCategories(
      qs ? `${qs}&orderBy.order=ASC` : `?orderBy.order=ASC`
    );

  const { data: categoriesData, error } = useSWR<
    IPaginated<ITaxonomy>,
    AxiosError<INestError>
  >(
    `${TaxonomyKeys.GET_ALL_PROJECTS_CATEGORIES}${
      qs ? `${qs}&orderBy.order=ASC` : `?orderBy.order=ASC`
    }`,
    fetcher
  );

  if (error) router.push('/500');
  if (!categoriesData) return <Loading />;

  return (
    <>
      {categoriesData.items.map((ci, i) => (
        <Button
          key={i}
          rounded="rounded-xl"
          size="h-10"
          type="button"
          variant={
            router.query['filterBy.projectCategory'] === ci.term
              ? 'primary'
              : 'primary-outline'
          }
          extraCSSClasses="min-w-[5rem] sm:min-w-[6rem] px-4 text-base sm:text-lg mb-3"
          onClick={() => {
            router.query['filterBy.projectCategory'] = ci.term;
            router.push(router);
          }}
        >
          {ci.term}
        </Button>
      ))}
    </>
  );
};

export default PortfolioCategories;
