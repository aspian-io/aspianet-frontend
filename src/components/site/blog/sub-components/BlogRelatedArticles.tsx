import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import Button from '../../../common/Button';
import { PostAgent } from '../../../../lib/axios/agent';
import useSWR from 'swr';
import { IPaginated } from '../../../../models/common/paginated-result';
import { IMiniPost } from '../../../../models/posts/post';
import { AxiosError } from 'axios';
import { INestError } from '../../../../models/common/error';
import { PostKeys } from '../../../../lib/swr/keys';
import { ITaxonomy } from '../../../../models/taxonomies/taxonomy';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IProps {
  tags: ITaxonomy[];
}

const BlogRelatedArticles: FC<IProps> = ({ tags }) => {
  const router = useRouter();

  const commaSeparatedTagsTerms =
    tags && tags.length > 0 ? tags.map((t) => t.term).join(',') : undefined;

  const fetcher = () =>
    PostAgent.blogsList(
      commaSeparatedTagsTerms
        ? `?filterBy.tagTerms=${commaSeparatedTagsTerms}&orderBy.createdAt=DESC`
        : `?orderBy.createdAt=DESC`
    );

  const { data: postsData, error } = useSWR<
    IPaginated<IMiniPost>,
    AxiosError<INestError>
  >(
    `${PostKeys.GET_BLOGS_LIST}${
      commaSeparatedTagsTerms
        ? `?filterBy.tagTerms=${commaSeparatedTagsTerms}&orderBy.createdAt=DESC`
        : `?orderBy.createdAt=DESC`
    }`,
    fetcher
  );

  return (
    <div className="flex flex-col justify-center items-start w-full border-b-primary border-b-2">
      <div className="text-xl sm:text-2xl font-bold text-dark">
        Related Articles
      </div>
      <hr className="w-full border border-primary mt-4 rounded" />
      {postsData && (
        <div className="flex justify-center items-center my-20 w-full h-[28rem]">
          <div className="prevEl sm:inline hidden text-primary/70 mr-4 cursor-pointer hoverable:hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {postsData.items.length > 0 && (
            <Swiper
              slidesPerView="auto"
              spaceBetween={10}
              // slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                enabled: true,
                prevEl: `.prevEl`,
                nextEl: `.nextEl`,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1536: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Autoplay]}
              className="w-full h-full"
            >
              {postsData.items.map((p, i) => (
                <SwiperSlide
                  className="flex flex-col justify-center items-center"
                  key={i}
                >
                  <div className="relative w-full h-1/2 rounded-t-3xl overflow-hidden">
                    {p.featuredImage?.key && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${p.featuredImage.key}`}
                        fill
                        sizes="(max-width: 24rem) 100vw"
                        placeholder="blur"
                        blurDataURL={imgPlaceholderDataURL}
                        priority
                        alt={
                          p.featuredImage.imageAlt ?? 'Article Featured Image'
                        }
                      />
                    )}
                    {!p.featuredImage?.key && (
                      <div className="absolute inset-0 bg-primary flex justify-center items-center text-light/60 text-xl font-bold">
                        No Photo
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-start items-center h-1/2 w-full border-primary border-l-2 border-b-2 border-r-2 border-dashed rounded-b-3xl px-6 pb-6 pt-4">
                    <div className="flex justify-between items-center w-full space-x-1">
                      <div className="flex justify-center items-center space-x-1 text-zinc-600 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                        <span className='truncate w-14 xs:w-24'>
                          By {p.createdBy.firstName} {p.createdBy.lastName}
                        </span>
                      </div>
                      <div className="flex justify-center items-center space-x-1 text-zinc-600 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                        <span>{p.commentsNum}</span>
                      </div>
                      <div className="flex justify-center items-center space-x-1 text-zinc-600 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                        <span>{p.likesNum}</span>
                      </div>
                      <div className="flex justify-center items-center space-x-1 text-zinc-600 text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                        <span>{p.bookmarksNum}</span>
                      </div>
                    </div>
                    <h3 className="mt-6 text-dark text-base sm:text-xl font-bold self-start w-full truncate">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-zinc-500 text-sm line-clamp-2">
                      {p.excerpt}
                    </p>
                    <Button
                      rounded="rounded-lg"
                      size="h-8"
                      type="button"
                      variant="primary"
                      onClick={() => router.push(`/blog/${p.slug}`)}
                      extraCSSClasses="px-4 text-sm mt-4"
                    >
                      Read More
                    </Button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className="nextEl sm:inline hidden text-primary/70 ml-4 cursor-pointer hoverable:hover:text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
      {!postsData && (
        <div className="flex justify-center items-center my-20 w-full h-[14rem]">
          <LoadingSpinner className="w-10 h-10 text-primary" />
        </div>
      )}
    </div>
  );
};

export default BlogRelatedArticles;
