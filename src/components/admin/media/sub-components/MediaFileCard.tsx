import { filesize } from 'filesize';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useState, useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { AdminFileAgent } from '../../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { matchRule, matchRules } from '../../../../lib/helpers/match-wildcards';
import {
  FileStatus,
  FileUpdateFormValues,
  IFileEntity,
  ImageSizeCategories,
} from '../../../../models/files/admin/file';
import {
  getAdminMediaState,
  setCheckAll,
  setCheckedItems,
} from '../../../../store/slices/admin/admin-media-slice';
import { useAppDispatch } from '../../../../store/store';
import Button from '../../../common/Button';
import ConfirmModal from '../../../common/ConfirmModal';
import FormikInput, { InputTypeEnum } from '../../../common/FormikInput';
import LoadingSpinner from '../../../common/LoadingSpinner';
import Modal from '../../../common/Modal';
import CompressOutline from '../../../common/vectors/CompressOutline';
import EPubOutline from '../../../common/vectors/EPubOutline';
import MsExcelOutline from '../../../common/vectors/MsExcelOutline';
import MsPowerPointOutline from '../../../common/vectors/MsPowerPointOutline';
import MsWordOutline from '../../../common/vectors/MsWordOutline';
import PDFOutline from '../../../common/vectors/PDFOutline';
import TextOutline from '../../../common/vectors/TextOutline';
import VideoOutline from '../../../common/vectors/VideoOutline';
import AdminCard from '../../common/AdminCard';
import * as Yup from 'yup';
import {
  audioType,
  compressedTypes,
  epubType,
  imageType,
  msExcelTypes,
  msPowerPointTypes,
  msWordTypes,
  pdfType,
  rtfType,
  videoType,
} from '../constants';

interface IProps extends Omit<IFileEntity, 'key'> {
  fileKey: string;
  swrKey?: string;
  itemsLength: number;
}

const MediaFileCard: FC<IProps> = ({
  filename,
  generatedImageChildren,
  id,
  fileKey,
  size,
  status,
  type,
  thumbnail,
  imageAlt,
  swrKey,
  itemsLength,
}) => {
  const { checkAll, checkedItems } = useSelector(getAdminMediaState);
  const dispatch = useAppDispatch();
  const [imgSelectedSizeLink, setImgSelectedSizeLink] = useState(
    `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`
  );
  const [showDetails, setShowDetails] = useState(false);
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const { data: session } = useSession();

  const getAscSortedImgChildren = () => {
    return generatedImageChildren.sort(
      (a, b) =>
        Number(a.imageSizeCategory!.toString().split('_')[1]) -
        Number(b.imageSizeCategory!.toString().split('_')[1])
    );
  };

  const getGeneratedImgChildBySize = (size: ImageSizeCategories) => {
    return generatedImageChildren.filter(
      (img) => img.imageSizeCategory === size
    )[0];
  };

  const webAddressRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

  useEffect(() => {
    if (checkedItems.length === itemsLength) {
      dispatch(setCheckAll(true));
    }
  }, [checkedItems.length, dispatch, itemsLength]);

  return (
    <>
      <Modal show={showDetails} onClose={() => setShowDetails(false)}>
        <div className="flex flex-col justify-start items-center px-4 space-y-3 w-full">
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">ID: </span>
            <div className="relative bg-zinc-100 pl-4 pr-12 py-1 rounded-lg">
              <div className="w-72">{id}</div>
              <Button
                rounded="rounded-r-lg"
                size="h-7"
                type="button"
                variant="primary"
                extraCSSClasses="absolute top-0 right-0 px-2.5 focus:ring-0 focus:ring-offset-0"
                onClick={() => {
                  navigator.clipboard.writeText(id);
                  toast.success('File ID copied to clipboard!', {
                    className: 'bg-success text-light text-sm',
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">File Name: </span>
            <span>{filename}</span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Type: </span>
            <span>{type}</span>
          </div>
          <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
            <span className="text-dark font-semibold mr-6">Size: </span>
            <span>{filesize(size).toString()}</span>
          </div>
          {matchRule(type, imageType) && (
            <>
              <div className="flex justify-start items-center text-sm text-zinc-700 w-full text-left">
                <span className="text-dark font-semibold mr-6">Status: </span>
                <span>
                  {status === FileStatus.READY && (
                    <div className="flex justify-center items-center text-xs text-light px-2 py-1 bg-success rounded-lg">
                      Ready
                    </div>
                  )}
                  {status === FileStatus.IN_PROGRESS && (
                    <div className="flex justify-center items-center text-xs text-light px-2 py-1 bg-primary rounded-lg">
                      <LoadingSpinner className="w-3 h-3" />
                      <span className="ml-2">In Progress...</span>
                    </div>
                  )}
                  {status === FileStatus.FAILED && (
                    <div className="flex justify-center items-center text-xs text-light px-2 py-1 bg-danger rounded-lg">
                      Failed
                    </div>
                  )}
                </span>
              </div>
              <div className="flex justify-start items-center text-sm text-zinc-700 w-full">
                <span className="text-dark font-semibold mr-2">
                  Image ALT:{' '}
                </span>

                <Formik
                  initialValues={{ imageAlt: imageAlt ?? '' }}
                  validationSchema={Yup.object({
                    imageAlt: Yup.string().max(
                      50,
                      'Image alt should be less than 50 characters'
                    ),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const { imageAlt: updatedImageAlt } =
                        await AdminFileAgent.edit(
                          session,
                          id,
                          new FileUpdateFormValues({
                            imageAlt: values.imageAlt,
                          })
                        );
                      await mutate(swrKey);
                      resetForm({
                        values: { imageAlt: updatedImageAlt ?? '' },
                      });
                      toast.success('Your image alt updated successfully.', {
                        className: 'bg-success text-light',
                      });
                    } catch (error) {
                      toast.error(
                        'Something went wrong, please try again later.',
                        {
                          className: 'bg-danger text-light',
                        }
                      );
                    }
                  }}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                      <div className="relative">
                        <Field
                          type={InputTypeEnum.text}
                          name="imageAlt"
                          placeholder="Image Alt"
                          className="text-xs h-9 rounded-xl ml-4 w-72 pr-16 focus:border-success"
                          labelClassName="hidden"
                          component={FormikInput}
                        />
                        <Button
                          rounded="rounded-r-xl"
                          size="h-9"
                          type="submit"
                          variant="success"
                          extraCSSClasses="absolute top-0 right-0 px-4 text-xs focus:ring-0 focus:ring-offset-0"
                          disabled={!(isValid && dirty) || isSubmitting}
                        >
                          {isSubmitting ? (
                            <LoadingSpinner className="h-4 w-4" />
                          ) : (
                            'Save'
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
          {matchRules(type, [videoType, audioType]) && (
            <>
              <div className="flex justify-start items-center text-sm text-zinc-700 w-full">
                <span className="text-dark font-semibold mr-6">Poster: </span>

                {thumbnail && (
                  <div>
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden">
                      <Link href={thumbnail} target="_blank">
                        <Image
                          className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                          src={thumbnail}
                          fill
                          placeholder="blur"
                          blurDataURL={imgPlaceholderDataURL}
                          alt={imageAlt ?? 'Image'}
                          sizes="(max-width: 640px) 100vw,
                     (max-width: 1200px) 50vw,
                      33vw"
                        />
                      </Link>
                    </div>
                  </div>
                )}

                <Formik
                  initialValues={{ thumbnail: thumbnail ?? '' }}
                  validationSchema={Yup.object({
                    thumbnail: Yup.string().matches(
                      webAddressRegex,
                      'Please enter a standard image link'
                    ),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    try {
                      const { thumbnail: updatedThumbnail } =
                        await AdminFileAgent.edit(
                          session,
                          id,
                          new FileUpdateFormValues({
                            thumbnail: values.thumbnail,
                          })
                        );
                      await mutate(swrKey);
                      resetForm({
                        values: { thumbnail: updatedThumbnail ?? '' },
                      });
                      toast.success('Your video poster updated successfully.', {
                        className: 'bg-success text-light',
                      });
                    } catch (error) {
                      toast.error(
                        'Something went wrong, please try again later.',
                        {
                          className: 'bg-danger text-light',
                        }
                      );
                    }
                  }}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form>
                      <div className="relative">
                        <Field
                          type={InputTypeEnum.text}
                          name="thumbnail"
                          placeholder="Thumbnail Link"
                          className="text-xs h-9 rounded-xl ml-4 w-72 pr-16 focus:border-success"
                          labelClassName="hidden"
                          component={FormikInput}
                        />
                        <Button
                          rounded="rounded-r-xl"
                          size="h-9"
                          type="submit"
                          variant="success"
                          extraCSSClasses="absolute top-0 right-0 px-4 text-xs focus:ring-0 focus:ring-offset-0"
                          disabled={!(isValid && dirty) || isSubmitting}
                        >
                          {isSubmitting ? (
                            <LoadingSpinner className="h-4 w-4" />
                          ) : (
                            'Save'
                          )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          )}
        </div>
      </Modal>
      <ConfirmModal
        onCancel={() => setRemoveConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminFileAgent.deletePermanently(session, id);
            await mutate(swrKey);
            setRemoveLoading(false);
            setRemoveConfirm(false);
            toast.success('The file deleted successfully.', {
              className: 'bg-success text-light text-sm',
            });
          } catch (error) {
            setRemoveLoading(false);
            setRemoveConfirm(false);
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
          }
        }}
        show={removeConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete the file permanently?"
      />
      <AdminCard
        className="flex flex-col justify-start items-center h-96 w-full pb-4"
        defaultPadding={false}
      >
        <div
          className={`relative flex justify-center w-full h-3/4 max-h-[16.5rem] items-start rounded-t-xl overflow-hidden`}
        >
          <input
            className="absolute z-10 top-4 left-4 w-5 h-5 ring-2 ring-light focus:ring-primary text-primary bg-light rounded border-primary disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400 border-2"
            type="checkbox"
            name="itemIds"
            value={id}
            onChange={(e) => {
              checkedItems.includes(id)
                ? dispatch(
                    setCheckedItems(checkedItems.filter((i) => i !== id))
                  )
                : dispatch(setCheckedItems([...checkedItems, id]));

              if (checkedItems.includes(id) && checkAll)
                dispatch(setCheckAll(false));
            }}
            checked={checkedItems.includes(id)}
          />
          {matchRule(type, imageType) && (
            <Link
              href={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
              target="_blank"
              className="relative w-full h-full"
            >
              {generatedImageChildren && generatedImageChildren.length > 0 && (
                <Image
                  className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                  src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${
                    getGeneratedImgChildBySize(ImageSizeCategories.SIZE_320)
                      ?.key
                  }`}
                  fill
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  alt={imageAlt ?? 'Image'}
                  sizes="(max-width: 640px) 100vw,
                     (max-width: 1200px) 50vw,
                      33vw"
                />
              )}
              {(!generatedImageChildren ||
                generatedImageChildren.length === 0) && (
                <Image
                  className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                  src={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                  fill
                  placeholder="blur"
                  blurDataURL={imgPlaceholderDataURL}
                  alt={imageAlt ?? 'Image'}
                  sizes="(max-width: 640px) 100vw,
                     (max-width: 1200px) 50vw,
                      33vw"
                />
              )}
            </Link>
          )}

          {matchRules(type, [videoType, audioType]) && !!thumbnail && (
            <div className="bg-gray-900 h-full">
              <ReactPlayer
                url={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      poster: thumbnail,
                    },
                  },
                }}
                controls
              />
            </div>
          )}

          {matchRules(type, [videoType, audioType]) && !thumbnail && (
            <div className="relative bg-gray-900 h-full">
              {matchRule(type, audioType) && (
                <div className="absolute w-full h-full flex justify-center items-center text-light/40 bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-14 h-14"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                    />
                  </svg>
                </div>
              )}

              <ReactPlayer
                url={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                width="100%"
                height="100%"
                previewTabIndex={5}
                controls
              />
            </div>
          )}

          {matchRule(type, pdfType) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <PDFOutline className="w-14 h-14" />
            </div>
          )}

          {matchRule(type, epubType) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <EPubOutline className="w-14 h-14" />
            </div>
          )}

          {matchRule(type, rtfType) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <TextOutline className="w-14 h-14" />
            </div>
          )}

          {matchRules(type, msWordTypes) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <MsWordOutline className="w-14 h-14" />
            </div>
          )}

          {matchRules(type, msExcelTypes) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <MsExcelOutline className="w-14 h-14" />
            </div>
          )}

          {matchRules(type, msPowerPointTypes) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <MsPowerPointOutline className="w-14 h-14" />
            </div>
          )}

          {matchRules(type, compressedTypes) && (
            <div className="flex justify-center items-center absolute inset-0 rounded-t-xl bg-primary fill-light/50">
              <CompressOutline className="w-14 h-14" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center text-xs w-full px-4 pt-4 space-y-2">
          <p className="w-11/12 truncate text-zinc-700">{filename}</p>

          {matchRule(type, imageType) &&
          generatedImageChildren &&
          generatedImageChildren.length > 0 ? (
            <div className="relative w-full">
              <select
                className="border-none text-xs bg-zinc-100 rounded-lg w-full focus:ring-primary focus:ring-2 h-7 py-0"
                style={{ backgroundPosition: 'right 2.5rem center' }}
                defaultValue={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                onChange={(e) => {
                  setImgSelectedSizeLink(e.target.value);
                }}
              >
                <option
                  value={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                >
                  Original
                </option>
                {getAscSortedImgChildren().map((img, idx) => (
                  <option
                    value={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${img.key}`}
                    key={idx}
                  >
                    {img.imageSizeCategory?.split('_')[1]} px
                  </option>
                ))}
              </select>
              <Button
                rounded="rounded-r-lg"
                size="h-7"
                type="button"
                variant="primary"
                extraCSSClasses="absolute -right-0.5 px-2.5 focus:ring-0 focus:ring-offset-0"
                onClick={() => {
                  navigator.clipboard.writeText(imgSelectedSizeLink);
                  toast.success('Image link copied to clipboard!', {
                    className: 'bg-success text-light text-sm',
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                  <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <Button
                rounded="rounded-l-lg"
                size="h-7"
                type="button"
                variant="primary"
                extraCSSClasses="flex justify-center items-center w-full px-4 focus:ring-0 focus:ring-offset-0"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`
                  );
                  toast.success('Link copied to clipboard!', {
                    className: 'bg-success text-light text-sm',
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: true,
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                  <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                </svg>
                <span className="text-xs ml-1">Copy Link</span>
              </Button>
              <Link
                href={`${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${fileKey}`}
                className="rounded-r-lg h-7 border-2 border-primary px-2 text-primary flex justify-center items-center ml-0.5 hoverable:hover:bg-primary hoverable:hover:text-light"
                download
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
              </Link>
            </div>
          )}

          <div className="flex justify-center items-center w-full">
            <Button
              rounded="rounded-l-lg"
              size="h-7"
              type="button"
              variant="primary"
              extraCSSClasses="flex justify-center items-center w-full px-4 focus:ring-0 focus:ring-offset-0"
              onClick={() => setShowDetails(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path
                  fillRule="evenodd"
                  d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs ml-1">Details</span>
            </Button>
            <Button
              rounded="rounded-r-lg"
              size="h-7"
              type="button"
              variant="danger-outline"
              extraCSSClasses="flex justify-center items-center px-2 ml-0.5 focus:ring-0 focus:ring-offset-0"
              onClick={() => setRemoveConfirm(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </AdminCard>
    </>
  );
};

export default MediaFileCard;
