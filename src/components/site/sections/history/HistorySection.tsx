import Image from 'next/image';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';

const HistorySection = () => {
  return (
    <div className="bg-primary-light/20 py-20">
      <div className="container mx-auto flex justify-start items-center w-full h-96 px-4">
        <div className="hidden sm:flex justify-start items-center w-full sm:w-1/2 sm:pr-8 h-96">
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <Image
              src="/assets/template/history-section/company.jpg"
              fill
              style={{
                objectFit: 'cover',
              }}
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Service Icon 3'}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full h-full sm:w-1/2 transition-all duration-300 sm:pl-8">
          <div className="flex flex-col justify-start items-center sm:items-start space-y-6 w-full">
            <h3 className="text-primary text-sm">About</h3>
            <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
              <span className="text-dark">Our</span>
              <span className="text-primary">&nbsp;History</span>
            </h3>
          </div>
          <div className="flex flex-col justify-start items-start w-full h-full relative">
            <p className="text-zinc-500 text-sm mt-10 line-clamp-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
              magni fuga voluptas repellat maiores eveniet obcaecati. Libero
              sint vero nihil! Praesentium deleniti suscipit quia saepe rerum
              dolorem ullam soluta necessitatibus. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Nihil ratione unde architecto iste
              et ipsum autem distinctio facilis dignissimos, accusantium quam
              nam nulla quibusdam minima temporibus neque natus beatae eaque.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quo accusantium nemo laborum nostrum asperiores
              architecto cupiditate voluptatibus beatae blanditiis? Debitis
              officiis deserunt natus molestiae dolores corrupti, reiciendis
              similique laborum?
            </p>
            <div className="flex justify-start items-center space-x-20 mt-10 absolute bottom-0">
              <div className="flex flex-col justify-center items-start">
                <div className="text-dark text-lg font-bold">12+</div>
                <div className="text-primary text-lg">Projects</div>
              </div>
              <div className="flex flex-col justify-center items-start">
                <div className="text-dark text-lg font-bold">100%</div>
                <div className="text-primary text-lg">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;
