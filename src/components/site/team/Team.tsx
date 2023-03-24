import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { AvatarSourceEnum } from '../../../models/auth/common';
import { IMinimalUser } from '../../../models/users/minimal-user';
import FacebookLogo from '../../common/vectors/FacebookLogo';
import GitHubLogo from '../../common/vectors/GitHubLogo';
import InstagramLogo from '../../common/vectors/InstagramLogo';
import LinkedInLogo from '../../common/vectors/LinkedInLogo';
import StackOverflowLogo from '../../common/vectors/StackOverflowLogo';
import TwitterLogo from '../../common/vectors/TwitterLogo';

interface IProps {
  members: IMinimalUser[];
}

const Team: FC<IProps> = ({ members }) => {
  const getUserAvatarSrc = (member: IMinimalUser) => {
    if (member.avatar) {
      return member.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${member.avatar}`
        : member.avatar;
    }
    return '';
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h1 className="text-primary text-sm">Team</h1>
        <h2 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
          <span className="text-dark">Our</span>
          <span className="text-primary">&nbsp;Team</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center items-center w-full mt-20 gap-8">
        {members.length > 0 &&
          members.map((m, i) => (
            <div
              className="flex flex-col justify-center items-center max-w-xs h-96 min-w-[18rem]"
              key={i}
            >
              <div className="relative w-full h-5/6 rounded-t-3xl overflow-hidden">
                {m.avatar && (
                  <Image
                    src={getUserAvatarSrc(m)}
                    fill
                    sizes="(max-width: 24rem) 100vw"
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    style={{
                      objectFit: 'cover',
                    }}
                    alt={`${m.firstName} ${m.lastName} avatar`}
                  />
                )}
                {!m.avatar && (
                  <div className="flex justify-center items-center w-full h-full bg-primary text-light font-bold text-xl">
                    No Avatar
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-start items-center h-1/2 w-full border-primary border-l-2 border-b-2 border-r-2 border-dashed rounded-b-3xl px-4">
                <h3 className="mt-4 text-dark text-xl font-bold self-start w-full truncate text-center">
                  {`${m.firstName} ${m.lastName}`}
                </h3>
                <p className="mt-4 text-zinc-500 text-sm line-clamp-5">
                  {m.role}
                </p>

                <div className="flex justify-center items-center space-x-2 w-full mt-4">
                  {m.facebook && (
                    <Link href={m.facebook} target="_blank">
                      <FacebookLogo className="w-6 h-6" />
                    </Link>
                  )}
                  {m.instagram && (
                    <Link href={m.instagram} target="_blank">
                      <InstagramLogo className="w-5 h-5 fill-pink-700" />
                    </Link>
                  )}
                  {m.twitter && (
                    <Link href={m.twitter} target="_blank">
                      <TwitterLogo className="w-7 h-7" />
                    </Link>
                  )}
                  {m.linkedIn && (
                    <Link href={m.linkedIn} target="_blank">
                      <LinkedInLogo className="w-4 h-4" />
                    </Link>
                  )}
                  {m.github && (
                    <Link href={m.github} target="_blank">
                      <GitHubLogo className="w-5 h-5" />
                    </Link>
                  )}
                  {m.stackoverflow && (
                    <Link href={m.stackoverflow} target="_blank">
                      <StackOverflowLogo className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Team;
