import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';
import { IComment } from '../../../../models/comments/comment';

interface IProps {
  projectsCommentsData: IComment[];
}

const TestimonialsSection: FC<IProps> = ({ projectsCommentsData }) => {
  return (
    <section className='container mx-auto'>
      <div className="flex flex-col justify-center items-center py-10 sm:py-20 transition-all duration-300">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h3 className="text-primary text-sm">Testimonials</h3>
          <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
            <span className="text-dark">What Our</span>
            <span className="text-primary">&nbsp;Clients Say</span>
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center mt-20 w-full h-[26rem] relative before:absolute sm:before:w-44 sm:before:h-44 before:bg-primary-light/30 before:rounded-xl before:-z-10 sm:before:-top-10 sm:before:-left-0 sm:pl-10">
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
            {projectsCommentsData.map((c, i) => (
              <SwiperSlide
                key={i}
                className="flex flex-col justify-center items-center p-10 border-2 border-primary border-dashed rounded-3xl bg-light w-full"
              >
                <p className="text-sm text-zinc-500 w-full line-clamp-6">
                  {c.content}
                </p>
                <div className="flex flex-col justify-start items-start w-full sm:ml-20 mt-10">
                  <div className="flex justify-start items-center pl-14 relative before:absolute before:left-0 before:h-1 before:w-10 before:bg-primary before:rounded text-dark text-base font-bold">
                    {c.firstName} {c.lastName}
                  </div>
                  <Link
                    href={`/projects/${c.post.slug}`}
                    target="_blank"
                    className="pl-14 text-blue-500 underline mt-2"
                  >
                    {c.post.title}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center w-full mt-10">
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
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
