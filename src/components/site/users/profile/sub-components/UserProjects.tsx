import Image from 'next/image';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../../lib/helpers/img-placeholder';
import { ImageSizeCategories } from '../../../../../models/files/file';
import { IUserProfile } from '../../../../../models/users/profile';
import Button from '../../../../common/Button';

interface IProps {
  profileData: IUserProfile;
}

const UserProjects: FC<IProps> = ({ profileData }) => {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1 before:-left-3">
          Projects
        </h3>
      </div>
      <div className="py-6 w-full">
        <hr className="border-zinc-200" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-stretch items-stretch gap-8 relative min-h-[20rem] sm:min-h-[20rem] w-full mt-4">
        {profileData.projects.map((p, i) => (
          <div
            key={i}
            className="relative w-full h-64 rounded-3xl overflow-hidden group outline-0 outline-none outline-primary/20 hoverable:hover:outline-dashed outline-offset-4 hoverable:hover:outline-2 hoverable:hover:outline-primary transition-all duration-300"
          >
            {p.featuredImage?.key && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${
                  p.featuredImage?.generatedImageChildren.filter(
                    (i) => i.imageSizeCategory === ImageSizeCategories.SIZE_320
                  )[0].key ?? p.featuredImage?.key
                }`}
                fill
                sizes="(max-width: 24rem) 100vw"
                placeholder="blur"
                blurDataURL={imgPlaceholderDataURL}
                priority
                alt={p.featuredImage?.imageAlt ?? 'Portfolio Photo'}
              />
            )}
            {!p.featuredImage?.key && (
              <div className="absolute bg-success inset-0 font-bold text-2xl text-light/60 flex justify-center items-center">
                Project
              </div>
            )}
            <div className="absolute w-full h-full -bottom-3/4 hoverable:-bottom-full hoverable:group-hover:bottom-0 bg-primary/90 flex flex-col justify-start hoverable:justify-center items-center space-y-2 hoverable:space-y-8 p-3 transition-all duration-300">
              <h3 className="text-light hoverable:text-xl font-bold w-full truncate text-center">
                {p.title}
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
        ))}
      </div>
    </>
  );
};

export default UserProjects;
