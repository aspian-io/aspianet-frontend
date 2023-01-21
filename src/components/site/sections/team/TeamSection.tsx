import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import FacebookLogo from '../../../common/vectors/FacebookLogo';
import GitHubLogo from '../../../common/vectors/GitHubLogo';
import InstagramLogo from '../../../common/vectors/InstagramLogo';
import LinkedInLogo from '../../../common/vectors/LinkedInLogo';
import StackOverflowLogo from '../../../common/vectors/StackOverflowLogo';
import TwitterLogo from '../../../common/vectors/TwitterLogo';

const TeamSection = () => {
  return (
    <section className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h3 className="text-primary text-sm">Team</h3>
        <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
          <span className="text-dark">Our</span>
          <span className="text-primary">&nbsp;Team</span>
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full mt-20 gap-8">
        <div className="flex flex-col justify-center items-center max-w-xs h-96 min-w-[18rem]">
          <div className="relative w-full h-5/6 rounded-t-3xl overflow-hidden">
            <Image
              src="/assets/template/team-section/staff1.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Service Icon 3'}
            />
          </div>
          <div className="flex flex-col justify-start items-center h-1/2 w-full border-primary border-l-2 border-b-2 border-r-2 border-dashed rounded-b-3xl px-4">
            <h3 className="mt-4 text-dark text-xl font-bold self-start w-full truncate text-center">
              John Doe
            </h3>
            <p className="mt-4 text-zinc-500 text-sm line-clamp-5">
              Fullstack Developer
            </p>

            <div className="flex justify-center items-center space-x-2 w-full mt-4">
              <Link href="#" target="_blank">
                <FacebookLogo className="w-6 h-6" />
              </Link>
              <Link href="#" target="_blank">
                <InstagramLogo className="w-5 h-5 fill-pink-700" />
              </Link>
              <Link href="#" target="_blank">
                <TwitterLogo className="w-7 h-7" />
              </Link>
              <Link href="#" target="_blank">
                <LinkedInLogo className="w-4 h-4" />
              </Link>
              <Link href="#" target="_blank">
                <GitHubLogo className="w-5 h-5" />
              </Link>
              <Link href="#" target="_blank">
                <StackOverflowLogo className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center max-w-xs h-96 min-w-[18rem]">
          <div className="relative w-full h-5/6 rounded-t-3xl overflow-hidden">
            <Image
              src="/assets/template/team-section/staff2.jpg"
              fill
              sizes="(max-width: 24rem) 100vw"
              placeholder="blur"
              blurDataURL={imgPlaceholderDataURL}
              priority
              alt={'Service Icon 3'}
            />
          </div>
          <div className="flex flex-col justify-start items-center h-1/2 w-full border-primary border-l-2 border-b-2 border-r-2 border-dashed rounded-b-3xl px-4">
            <h3 className="mt-4 text-dark text-xl font-bold self-start w-full truncate text-center">
              Jane Doe
            </h3>
            <p className="mt-4 text-zinc-500 text-sm line-clamp-5">
              Frontend Developer
            </p>

            <div className="flex justify-center items-center space-x-2 w-full mt-4">
              <Link href="#" target="_blank">
                <FacebookLogo className="w-6 h-6" />
              </Link>
              <Link href="#" target="_blank">
                <InstagramLogo className="w-5 h-5 fill-pink-700" />
              </Link>
              <Link href="#" target="_blank">
                <TwitterLogo className="w-7 h-7" />
              </Link>
              <Link href="#" target="_blank">
                <LinkedInLogo className="w-4 h-4" />
              </Link>
              <Link href="#" target="_blank">
                <GitHubLogo className="w-5 h-5" />
              </Link>
              <Link href="#" target="_blank">
                <StackOverflowLogo className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
