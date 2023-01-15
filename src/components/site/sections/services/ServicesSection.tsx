import Image from 'next/image';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';

const ServicesSection = () => {
  return (
    <div className="bg-primary-light/20">
      <div className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h3 className="text-primary text-sm">Services</h3>
          <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">Our</span>
            <span className="text-primary">&nbsp;Services</span>
          </h3>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-20 w-full space-y-6 md:space-y-0 md:space-x-6 lg:space-x-10 xl:space-x-20">
          <div className="flex flex-col justify-start items-center w-full md:w-1/3 h-96 border-2 border-dashed border-primary bg-light rounded-3xl py-12 px-8">
            <div className="relative w-20 sm:w-24 h-20 sm:h-24">
              <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 z-0"></div>
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                <Image
                  src="/assets/template/subheading-section/service-design.svg"
                  fill
                  sizes="(max-width: 5rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 1'}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-dark mt-8 mb-4 w-full truncate">
              UI/UX Design
            </h3>
            <p className="text-zinc-700 line-clamp-6 sm:line-clamp-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              excepturi assumenda voluptatum! Voluptates veritatis cupiditate
              quia commodi placeat. Possimus saepe cupiditate modi dicta atque
              nihil voluptatibus. Tempora minima quas quod.
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-full md:w-1/3 h-96 bg-primary rounded-3xl py-12 px-8">
            <div className="relative w-20 sm:w-24 h-20 sm:h-24">
              <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-light/20 z-0"></div>
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                <Image
                  src="/assets/template/subheading-section/service-frontend.svg"
                  fill
                  sizes="(max-width: 5rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 2'}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-light mt-8 mb-4 w-full truncate">
              Frontend Development
            </h3>
            <p className="text-light line-clamp-6 sm:line-clamp-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              excepturi assumenda voluptatum! Voluptates veritatis cupiditate
              quia commodi placeat. Possimus saepe cupiditate modi dicta atque
              nihil voluptatibus. Tempora minima quas quod.
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-full md:w-1/3 h-96 border-2 border-dashed border-primary bg-light rounded-3xl py-12 px-8">
            <div className="relative w-20 sm:w-24 h-20 sm:h-24">
              <div className="absolute bottom-0 right-0 rounded-full w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 z-0"></div>
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 right-2">
                <Image
                  src="/assets/template/subheading-section/service-api.svg"
                  fill
                  sizes="(max-width: 5rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 3'}
                />
              </div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-dark mt-8 mb-4 w-full truncate">
              Backend Development
            </h3>
            <p className="text-zinc-700 line-clamp-6 sm:line-clamp-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              excepturi assumenda voluptatum! Voluptates veritatis cupiditate
              quia commodi placeat. Possimus saepe cupiditate modi dicta atque
              nihil voluptatibus. Tempora minima quas quod.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
