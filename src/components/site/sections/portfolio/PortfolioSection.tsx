import Image from 'next/image';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import Button from '../../../common/Button';

const PortfolioSection = () => {
  return (
    <div className="bg-primary-light/20">
      <div className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h3 className="text-primary text-sm">Portfolio</h3>
          <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">Our</span>
            <span className="text-primary">&nbsp;Projects</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-stretch items-stretch gap-8 relative min-h-[20rem] sm:min-h-[20rem] w-full mt-20">
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-1.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-2.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-3.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-4.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-5.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-6.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-7.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
          <div className="relative w-full min-h-[20rem] h-full rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300">
            <Image
              src="/assets/template/portfolio-section/pic-8.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Portfolio Photo'}
            />
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                UI/UX Design
              </h3>
              <Button
                rounded="rounded-lg"
                size="h-7 hoverable:h-9"
                type="button"
                variant="success"
                onClick={() => {}}
                extraCSSClasses="px-3 hoverable:px-6 text-xs sm:text-sm"
              >
                Read More
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-14">
          <Button
            rounded="rounded-xl"
            size="h-10 sm:h-12"
            type="button"
            variant="primary"
            onClick={() => {}}
            extraCSSClasses="px-12 sm:text-lg"
          >
            See All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
