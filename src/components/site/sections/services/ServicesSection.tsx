import Image from 'next/image';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { IPost } from '../../../../models/posts/post';

interface IProps {
  serviceSectionData: IPost[];
}

interface IContent {
  content_title?: string;
  content_description?: string;
}

const ServicesSection: FC<IProps> = ({ serviceSectionData }) => {
  serviceSectionData.sort((a, b) => Number(a.order) - Number(b.order));

  const firstSegData = serviceSectionData[0];
  const secondSegData = serviceSectionData[1];
  const thirdSegData = serviceSectionData[2];

  function getContentObject(postData: IPost): IContent {
    if (postData && postData?.content) {
      const content: IContent = JSON.parse(postData.content);
      return {
        content_title: content.content_title,
        content_description: content.content_description,
      };
    }

    return {
      content_title: '',
      content_description: '',
    };
  }

  return (
    <section className="bg-primary-light/20">
      <div className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-20 transition-all duration-300">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h3 className="text-primary text-sm">Services</h3>
          <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">Our</span>
            <span className="text-primary">&nbsp;Services</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-stretch items-stretch mt-20 w-full gap-6">
          {firstSegData && (
            <div className="flex flex-col justify-start items-center w-full h-96 border-2 border-dashed border-primary bg-light rounded-3xl py-12 px-8">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 z-0"></div>
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${firstSegData.featuredImage?.key}`}
                    fill
                    sizes="(max-width: 5rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={
                      firstSegData.featuredImage?.imageAlt ?? 'Service Icon 1'
                    }
                  />
                </div>
              </div>
              <h3 className="text-lg text-center sm:text-2xl font-bold text-dark mt-8 mb-4 w-full truncate">
                {getContentObject(firstSegData).content_title}
              </h3>
              <p className="text-zinc-700 line-clamp-6 sm:line-clamp-5">
                {getContentObject(firstSegData).content_description}
              </p>
            </div>
          )}
          {secondSegData && (
            <div className="flex flex-col justify-start items-center w-full h-96 bg-primary rounded-3xl py-12 px-8">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-light/20 z-0"></div>
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${secondSegData.featuredImage?.key}`}
                    fill
                    sizes="(max-width: 5rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={
                      secondSegData.featuredImage?.imageAlt ?? 'Service Icon 2'
                    }
                  />
                </div>
              </div>
              <h3 className="text-lg text-center sm:text-2xl font-bold text-light mt-8 mb-4 w-full truncate">
                {getContentObject(secondSegData).content_title}
              </h3>
              <p className="text-light line-clamp-6 sm:line-clamp-5">
                {getContentObject(secondSegData).content_description}
              </p>
            </div>
          )}
          {thirdSegData && (
            <div className="flex flex-col justify-start items-center w-full h-96 border-2 border-dashed border-primary bg-light rounded-3xl py-12 px-8">
              <div className="relative w-20 sm:w-24 h-20 sm:h-24">
                <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 z-0"></div>
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${thirdSegData.featuredImage?.key}`}
                    fill
                    sizes="(max-width: 5rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={
                      thirdSegData.featuredImage?.imageAlt ?? 'Service Icon 3'
                    }
                  />
                </div>
              </div>
              <h3 className="text-lg text-center sm:text-2xl font-bold text-dark mt-8 mb-4 w-full truncate">
                {getContentObject(thirdSegData).content_title}
              </h3>
              <p className="text-zinc-700 line-clamp-6 sm:line-clamp-5">
                {getContentObject(thirdSegData).content_description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
