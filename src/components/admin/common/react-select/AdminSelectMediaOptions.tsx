import Image from 'next/image';
import React, { FC } from 'react';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { matchRule, matchRules } from '../../../../lib/helpers/match-wildcards';
import {
  IFileEntity,
  ImageSizeCategories,
} from '../../../../models/files/admin/file';
import { imageType } from '../../media/constants';

const AdminSelectMediaOptions: FC<
  Omit<IFileEntity, 'key'> & { fileKey: string }
> = ({ fileKey, type, filename, imageAlt, generatedImageChildren }) => {
  const ext = fileKey.split('.').pop()?.toUpperCase();

  const getGeneratedImgChildBySize = (size: ImageSizeCategories) => {
    return generatedImageChildren.filter(
      (img) => img.imageSizeCategory === size
    )[0];
  };

  return (
    <div className="flex justify-start items-center">
      {matchRule(type, imageType) && (
        <div className="relative h-8 w-8 rounded overflow-hidden">
          <Image
            className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
            src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${
              getGeneratedImgChildBySize(ImageSizeCategories.SIZE_160).key
            }`}
            fill
            placeholder="blur"
            blurDataURL={imgPlaceholderDataURL}
            alt={imageAlt ?? 'Image'}
            sizes="(max-width: 640px) 100vw,
       (max-width: 1200px) 50vw,
        33vw"
          />
        </div>
      )}
      {!matchRule(type, imageType) && (
        <div className="flex justify-center items-center px-1 h-8 min-w-[2rem] rounded bg-primary text-xs text-light overflow-hidden">
          {ext}
        </div>
      )}
      <div className="text-xs text-zinc-600 ml-2">{filename}</div>
    </div>
  );
};

export default AdminSelectMediaOptions;
