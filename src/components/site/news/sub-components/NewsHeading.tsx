import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';

const NewsHeading = () => {
  return (
    <>
      <div className="flex justify-center items-center space-y-6 w-full">
        <h1 className="flex relative font-bold text-3xl sm:text-4xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
          <span className="text-primary">News</span>
        </h1>
      </div>

      {/* Sliders Begin */}
      {/* <div className="flex flex-col lg:flex-row justify-center items-start w-full mt-10 lg:space-x-10">
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center items-center w-full mb-4">
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
          <Swiper
            slidesPerView={1}
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
            modules={[Navigation, Autoplay]}
            className="w-full h-full"
          >
            <SwiperSlide className="flex flex-col justify-center items-center">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/template/blog-section/pic-1.jpg"
                  fill
                  sizes="(max-width: 24rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 3'}
                />
                <div className="absolute top-10 w-20 h-12 bg-primary text-light font-semibold text-lg flex justify-center items-center rounded-r-full">
                  New
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full h-20 bg-primary/90 text-light text-xs sm:text-sm flex justify-between items-center px-10">
                  <div className="w-1/2 hidden sm:flex justify-start items-center">
                    <div className="flex justify-center items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <span>By Omid Rouhani</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    <span>12</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span>51</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    <span>9</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-full mt-6">
                <h4 className="text-primary font-bold sm:text-lg">
                  JavaScript
                </h4>
                <h3 className="text-dark text-xl sm:text-2xl font-bold mt-4 line-clamp-1">
                  How to write clean code in a NodeJS project
                </h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col justify-center items-center">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/template/blog-section/pic-2.jpg"
                  fill
                  sizes="(max-width: 24rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 3'}
                />
                <div className="absolute top-10 w-20 h-12 bg-primary text-light font-semibold text-lg flex justify-center items-center rounded-r-full">
                  New
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full h-20 bg-primary/90 text-light text-xs sm:text-sm flex justify-between items-center px-10">
                  <div className="w-1/2 hidden sm:flex justify-start items-center">
                    <div className="flex justify-center items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <span>By Omid Rouhani</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    <span>12</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span>51</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    <span>9</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-full mt-6">
                <h4 className="text-primary font-bold sm:text-lg">
                  JavaScript
                </h4>
                <h3 className="text-dark text-xl sm:text-2xl font-bold mt-4 line-clamp-1">
                  How to write clean code in a NodeJS project
                </h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex flex-col justify-center items-center">
              <div className="relative w-full h-96 rounded-3xl overflow-hidden">
                <Image
                  src="/assets/template/blog-section/pic-3.jpg"
                  fill
                  sizes="(max-width: 24rem) 100vw"
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  priority
                  alt={'Service Icon 3'}
                />
                <div className="absolute top-10 w-20 h-12 bg-primary text-light font-semibold text-lg flex justify-center items-center rounded-r-full">
                  New
                </div>
                <div className="absolute bottom-0 left-0 right-0 w-full h-20 bg-primary/90 text-light text-xs sm:text-sm flex justify-between items-center px-10">
                  <div className="w-1/2 hidden sm:flex justify-start items-center">
                    <div className="flex justify-center items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <span>By Omid Rouhani</span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                    <span>12</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <span>51</span>
                  </div>
                  <div className="flex justify-center items-center space-x-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    <span>9</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start w-full mt-6">
                <h4 className="text-primary font-bold sm:text-lg">
                  JavaScript
                </h4>
                <h3 className="text-dark text-xl sm:text-2xl font-bold mt-4 line-clamp-1">
                  How to write clean code in a NodeJS project
                </h3>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
          <h4 className="mt-4 mb-5 text-dark text-xl font-bold">Top Rated</h4>
          <div className="flex justify-center items-center">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              direction="vertical"
              loop={true}
              // loopFillGroupWithBlank={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                enabled: true,
                prevEl: `.prevElVert`,
                nextEl: `.nextElVert`,
              }}
              modules={[Navigation, Autoplay]}
              className="w-full h-[30rem]"
            >
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-1.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-2.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-3.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-4.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-5.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-6.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="flex justify-center items-center">
                <div className="relative w-44 h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/template/blog-section/pic-7.jpg"
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt={'Service Icon 3'}
                  />
                </div>
                <div className="flex flex-col justify-start items-start w-full ml-6">
                  <h4 className="text-primary text-xs sm:text-base font-bold">
                    JavaScript
                  </h4>
                  <h3 className="text-dark text-sm sm:text-lg font-bold mt-2 line-clamp-2">
                    How to write clean code in a NodeJS project
                  </h3>
                  <div className="text-dark mt-2 text-xs font-semibold line-clamp-1">
                    <span className="text-zinc-400 mr-1">Author:</span>
                    Omid Rouhani
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="flex flex-col justify-center items-center w-12 ml-4">
              <div className="prevElVert sm:inline hidden text-primary/70 mb-4 cursor-pointer hoverable:hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0V8.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L6.2 9.74a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="nextElVert sm:inline hidden text-primary/70 cursor-pointer hoverable:hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L7.3 9.24a.75.75 0 00-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Sliders End */}
    </>
  );
};

export default NewsHeading;
