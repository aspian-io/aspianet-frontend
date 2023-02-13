import { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { PostAgent } from '../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { PostKeys } from '../../../lib/swr/keys';
import { AvatarSourceEnum } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IPost, IPostStat } from '../../../models/posts/post';
import { TaxonomyTypeEnum } from '../../../models/taxonomies/admin/taxonomy';
import { ITaxonomy } from '../../../models/taxonomies/taxonomy';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import FacebookLogo from '../../common/vectors/FacebookLogo';
import GitHubLogo from '../../common/vectors/GitHubLogo';
import InstagramLogo from '../../common/vectors/InstagramLogo';
import LinkedInLogo from '../../common/vectors/LinkedInLogo';
import StackOverflowLogo from '../../common/vectors/StackOverflowLogo';
import TwitterLogo from '../../common/vectors/TwitterLogo';
import Comments from '../comments/Comments';
import { Link as SpyLink, Element as SpyElement } from 'react-scroll';
import { PostTypeEnum } from '../../../models/posts/admin/post';

interface IProps {
  project: IPost;
}

const PortfolioDetails: FC<IProps> = ({ project }) => {
  const router = useRouter();
  const { data: session } = useSession();

  function getCommaSeparatedCategoriesString(taxonomies: ITaxonomy[]): string {
    const categories = taxonomies.filter(
      (t) => t.type === TaxonomyTypeEnum.PROJECT_CATEGORY
    );
    if (categories.length > 0) return categories.map((t) => t.term).join(', ');

    return '';
  }

  return (
    <div className="flex flex-col justify-center items-start my-10 transition-all duration-300">
      <Button
        rounded="rounded-xl"
        size="h-9"
        type="button"
        variant="link"
        extraCSSClasses="flex justify-center items-center pr-4 text-primary text-sm"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">Portfolio</span>
      </Button>
      <h1 className="text-dark font-bold text-xl sm:text-3xl mt-10">
        {project.title}
      </h1>
      <h2 className="text-primary font-bold sm:text-xl my-2">
        {getCommaSeparatedCategoriesString(project.taxonomies)}
      </h2>
      <div className="relative w-full h-56 xs:h-72 sm:h-96 lg:h-[36rem] xl:h-[46rem] rounded-xl sm:rounded-3xl overflow-hidden mt-4">
        {project.featuredImage?.key && (
          <Image
            className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
            src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${project.featuredImage.key}`}
            fill
            style={{
              objectFit: 'cover',
            }}
            sizes="(max-width: 24rem) 100vw"
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            priority
            alt={project.featuredImage.imageAlt ?? 'Blog Img'}
          />
        )}
        {!project.featuredImage?.key && (
          <div className="absolute inset-0 bg-primary flex justify-center items-center text-light/50 text-2xl sm:text-5xl font-bold">
            No Photo
          </div>
        )}
      </div>

      {project.content && (
        <div
          className="text-zinc-700 pt-20 text-sm sm:text-base lg:text-lg"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      )}

      {session && session.user.id === project.projectOwner?.id && (
        <Comments postId={project.id} postType={PostTypeEnum.PROJECT} />
      )}
    </div>
  );
};

export default PortfolioDetails;
