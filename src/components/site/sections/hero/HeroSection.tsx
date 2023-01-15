import Image from 'next/image';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
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

const HeroSection = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start py-10 sm:py-20 px-4 transition-all duration-300">
      <div className="flex flex-col justify-center items-start w-full lg:w-1/2 relative order-2 lg:order-1">
        <p className="md:text-lg">{"Hi, we're"}</p>
        <p className="text-2xl md:text-5xl py-6 md:py-12">
          A <span className="text-primary font-bold">professional team</span>
        </p>
        <p className="text-zinc-400 text-xl md:text-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          doloremque hic fuga consequatur ducimus perspiciatis facilis quod non
          iure deserunt nesciunt natus asperiores.
        </p>
        <div className="flex flex-col sm:flex-row justify-start items-center w-full mt-12 md:mt-36 space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            rounded="rounded-2xl"
            size="h-12 md:h-16"
            type="button"
            variant="primary"
            block
            extraCSSClasses="sm:w-56 md:text-xl"
            onClick={() => {}}
          >
            Find out more
          </Button>
          <Button
            rounded="rounded-2xl"
            size="h-12 md:h-16"
            type="button"
            variant="link"
            extraCSSClasses="flex justify-center items-center space-x-1 w-56 md:text-xl text-primary"
            onClick={() => {}}
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
            <span>Watch video</span>
          </Button>
        </div>
        <div className="hidden sm:flex justify-start items-center space-x-4 sm:space-x-8 md:space-x-10 fill-zinc-300 mt-20">
          <GitHubLogo className="w-9 h-9" />
          <NodeJsLogo className="w-10 h-10" />
          <TypeScriptLogo className="w-8 h-8" />
          <NestJsLogo className="w-10 h-10" />
          <MongoDbLogo className="w-10 h-10" />
          <PostgresLogo className="w-10 h-10" />
          <ReactLogo className="w-10 h-10" />
          <NextJsLogo className="w-20 h-10" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-96 sm:h-[37rem] relative order-1 lg:order-2 mb-10 sm:mb-20">
        <DotSeamlessPattern className="absolute -bottom-16 right-0 -z-10 fill-primary/10 w-72 h-72 hidden sm:inline" />
        <div className="absolute top-0 -translate-x-6 h-96 sm:h-full w-60 sm:w-96 rounded-t-full rounded-b-lg bg-gradient-to-b from-primary/20"></div>
        <div className="relative w-60 sm:w-96 h-96 sm:h-[37rem] rounded-t-full rounded-b-[50rem] overflow-hidden mt-6 shadow-primary/10">
          <Image
            src="/assets/template/hero-section/top-photo.jpg"
            fill
            sizes="(max-width: 24rem) 100vw"
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            priority
            alt={'Hero Photo'}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
