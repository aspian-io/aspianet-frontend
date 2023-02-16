import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { IPost } from '../../../../models/posts/post';
import Button from '../../../common/Button';
import DotSeamlessPattern from '../../../common/vectors/DotSeamlessPattern';
import GitHubLogo from '../../../common/vectors/GitHubLogo';
import MongoDbLogo from '../../../common/vectors/MongoDbLogo';
import NestJsLogo from '../../../common/vectors/NestJsLogo';
import NextJsLogo from '../../../common/vectors/NextJsLogo';
import NodeJsLogo from '../../../common/vectors/NodeJsLogo';
import PostgresLogo from '../../../common/vectors/PostgresLogo';
import ReactLogo from '../../../common/vectors/ReactLogo';
import TypeScriptLogo from '../../../common/vectors/TypeScriptLogo';

interface IProps {
  heroSectionData?: IPost;
}

interface IContent {
  part_1?: string;
  part_2?: string;
  part_3?: string;
  btn1_title?: string;
  btn1_href?: string;
  btn2_title?: string;
  btn2_href?: string;
}

const HeroSection: FC<IProps> = ({ heroSectionData }) => {
  const router = useRouter();

  function getContentObject(): IContent {
    if (heroSectionData && heroSectionData.content) {
      const content: IContent = JSON.parse(heroSectionData.content);
      return {
        part_1: content.part_1,
        part_2: content.part_2,
        part_3: content.part_3,
        btn1_title: content.btn1_title,
        btn1_href: content.btn1_href,
        btn2_title: content.btn2_title,
        btn2_href: content.btn2_href,
      };
    }

    return {
      part_1: '',
      part_2: '',
      part_3: '',
      btn1_title: '',
      btn1_href: '',
      btn2_title: '',
      btn2_href: '',
    };
  }

  const contentData = getContentObject();

  return (
    <section className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start py-10 sm:py-20 transition-all duration-300">
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 relative order-2 lg:order-1">
        {contentData.part_1 && contentData.part_1.length > 0 && (
          <p className="md:text-lg">{contentData.part_1}</p>
        )}
        {contentData.part_2 && contentData.part_2.length > 0 && (
          <p className="text-2xl md:text-5xl py-6 md:py-12 text-primary font-bold">
            {contentData.part_2}
          </p>
        )}
        {contentData.part_3 && contentData.part_3.length > 0 && (
          <p className="text-zinc-400 text-xl md:text-2xl">
            {contentData.part_3}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-start items-center w-full mt-12 md:mt-16 space-y-4 sm:space-y-0 sm:space-x-4">
          {contentData.btn1_title &&
            contentData.btn1_title.length > 0 &&
            contentData.btn1_href && (
              <Button
                rounded="rounded-xl"
                size="h-12"
                type="button"
                variant="primary"
                block
                extraCSSClasses="sm:w-52 md:text-lg"
                onClick={() => {
                  router.push(contentData.btn1_href!);
                }}
              >
                {contentData.btn1_title}
              </Button>
            )}
          {contentData.btn2_title &&
            contentData.btn2_title.length > 0 &&
            contentData.btn2_href && (
              <Button
                rounded="rounded-xl"
                size="h-12"
                type="button"
                variant="link"
                extraCSSClasses="flex justify-center items-center sm:space-x-1 w-52 md:text-xl text-primary"
                onClick={() => {
                  router.push(contentData.btn2_href!);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
                <span>{contentData.btn2_title}</span>
              </Button>
            )}
        </div>
        <div className="hidden sm:flex justify-start items-center space-x-4 sm:space-x-6 fill-zinc-300 lg:mt-16 xl:mt-24">
          <GitHubLogo className="w-8 h-8" />
          <NodeJsLogo className="w-9 h-9" />
          <TypeScriptLogo className="w-7 h-7" />
          <NestJsLogo className="w-9 h-9" />
          <MongoDbLogo className="w-9 h-9" />
          <PostgresLogo className="w-9 h-9" />
          <ReactLogo className="w-9 h-9" />
          <NextJsLogo className="w-20 h-9" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-96 sm:h-[32rem] relative order-1 lg:order-2 mb-10 sm:mb-20">
        <DotSeamlessPattern className="absolute -bottom-14 right-0 -z-10 fill-primary/10 w-60 h-60 hidden sm:inline" />
        <div className="absolute top-2 h-96 -translate-y-6 sm:translate-x-9 sm:h-full w-60 sm:w-80 rounded-t-full rounded-b-lg bg-gradient-to-b from-primary/20"></div>
        {heroSectionData?.featuredImage && (
          <div className="relative sm:ml-28 w-60 sm:w-80 h-96 sm:h-[33rem] rounded-t-full rounded-b-[50rem] overflow-hidden shadow-primary/10">
            <Image
              src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${heroSectionData.featuredImage.key}`}
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={
                heroSectionData.featuredImage.imageAlt ?? 'Hero Section Photo'
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
