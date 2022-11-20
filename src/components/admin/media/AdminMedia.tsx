import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { AdminFileAgent } from '../../../lib/axios/agent';
import { AdminFileKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import { IPaginated } from '../../../models/common/paginated-result';
import { IFileEntity } from '../../../models/files/admin/file';
import {
  getAdminMediaState,
  setCheckAll,
  setCheckedItems,
} from '../../../store/slices/admin/admin-media-slice';
import { useAppDispatch } from '../../../store/store';
import Button from '../../common/Button';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';
import AdminPagination from '../common/table/sub-components/AdminPagination';
import MediaFileCard from './sub-components/MediaFileCard';
import * as Yup from 'yup';
import ConfirmModal from '../../common/ConfirmModal';
import { toast } from 'react-toastify';

const AdminMedia = () => {
  const { checkAll, checkedItems } = useSelector(getAdminMediaState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [sort, setSort] = useState<'DESC' | 'ASC'>('DESC');
  const qs = router.asPath.split('?', 2)[1]
    ? `?${router.asPath.split('?', 2)[1]}`
    : '';

  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const initialSort = () => {
    if (!router.query['orderBy.createdAt']) {
      return qs ? '&orderBy.createdAt=DESC' : '?orderBy.createdAt=DESC';
    }
    return '';
  };

  const fetcher = () => AdminFileAgent.list(session, `${qs}${initialSort()}`);
  const swrKey = `${AdminFileKeys.GET_ALL_FILES}${qs}${initialSort()}`;
  const {
    data: filesData,
    error,
    mutate,
  } = useSWR<IPaginated<IFileEntity>, AxiosError<INestError>>(swrKey, fetcher);

  const validationSchema = Yup.object({
    search: Yup.string().max(
      50,
      'Search value must be less than 50 characters'
    ),
  });

  if (error) router.push('/500');

  return (
    <>
      <ConfirmModal
        onCancel={() => setRemoveConfirm(false)}
        onConfirm={async () => {
          if (checkedItems.length === 0) {
            toast.error('No items selected', {
              className: 'bg-danger text-light text-sm',
            });
          }
          try {
            setRemoveLoading(true);
            await AdminFileAgent.bulkDeletePermanently(session, checkedItems);
            dispatch(setCheckedItems([]));
            await mutate();
            setRemoveLoading(false);
            setRemoveConfirm(false);
            toast.success(
              'The selected files have been deleted successfully.',
              {
                className: 'bg-success text-light text-sm',
              }
            );
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
        text="Are you sure you want to delete the selected files permanently?"
      />
      <div className="flex flex-col justify-center items-start w-full">
        {filesData && filesData.items.length > 0 && (
          <>
            <AdminPagination
              className="my-6 px-1.5"
              fieldsBgClassName="bg-light"
              baseUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/media`}
              currentPage={
                router.query.page
                  ? +router.query.page
                  : filesData?.meta.currentPage
              }
              totalPages={filesData?.meta.totalPages}
            />
            {filesData.items.length > 0 && (
              <>
                <div className="flex justify-center sm:justify-between items-center mb-4 w-full px-1.5">
                  <Formik
                    initialValues={{
                      search:
                        (router.query['searchBy.filename'] as string) ?? '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                      if (!values.search || values.search.trim().length === 0) {
                        delete router.query['searchBy.filename'];
                        router.push(router);
                      } else {
                        router.query['searchBy.filename'] = values.search;
                        router.push(router);
                      }
                    }}
                  >
                    {({
                      isSubmitting,
                      isValid,
                      dirty,
                      values,
                      handleChange,
                    }) => (
                      <Form className="w-full sm:w-80">
                        <fieldset>
                          <div className="relative group flex w-full">
                            <Field
                              type={InputTypeEnum.text}
                              name="search"
                              placeholder="Search"
                              className="text-xs sm:text-sm h-9 w-full rounded-xl pr-11 group-focus-within:border-primary bg-light shadow"
                              labelClassName="hidden"
                              component={FormikInput}
                            />
                            <button
                              type="submit"
                              className="absolute top-0 right-0 bg-primary hoverable:hover:bg-primary-dark text-light w-11 h-9 flex justify-center items-center rounded-r-xl rounded-l-none outline-hidden disabled:hoverable:hover:bg-primary-light disabled:bg-primary-light"
                              disabled={!(isValid && dirty)}
                            >
                              {isSubmitting ? (
                                <LoadingSpinner className="w-4 h-4" />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        </fieldset>
                      </Form>
                    )}
                  </Formik>

                  {sort === 'DESC' && (
                    <Button
                      rounded="rounded-xl"
                      size="h-9"
                      type="button"
                      variant="primary"
                      extraCSSClasses="hidden sm:flex px-3 text-xs font-normal justify-center items-center"
                      onClick={() => {
                        setSort('ASC');
                        router.query['orderBy.createdAt'] = 'ASC';
                        router.push(router);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="mx-1">Sort</span>
                    </Button>
                  )}
                  {sort === 'ASC' && (
                    <Button
                      rounded="rounded-xl"
                      size="h-9"
                      type="button"
                      variant="primary"
                      extraCSSClasses="hidden px-3 mt-6 text-xs font-normal sm:flex justify-center items-center"
                      onClick={() => {
                        setSort('DESC');
                        router.query['orderBy.createdAt'] = 'DESC';
                        router.push(router);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <span className="mx-1">Sort</span>
                    </Button>
                  )}
                </div>
                <div className="flex justify-between items-center mb-4 w-full">
                  <input
                    className="ml-4 w-5 h-5 ring-8 ring-light focus:ring-primary text-primary bg-light rounded border-primary disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400 border-2"
                    type="checkbox"
                    name="selectAllFiles"
                    onChange={(e) => {
                      dispatch(setCheckAll(e.target.checked));
                      e.target.checked
                        ? dispatch(
                            setCheckedItems(filesData.items.map((i) => i.id))
                          )
                        : dispatch(setCheckedItems([]));
                    }}
                    checked={checkAll}
                  />
                  <button
                    className="text-xs rounded-xl px-4 py-2.5 bg-danger text-light disabled:bg-danger-light disabled:hoverable:hover:bg-danger-light hoverable:hover:bg-danger-dark outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-dark mr-1"
                    disabled={checkedItems.length === 0}
                    onClick={() => setRemoveConfirm(true)}
                  >
                    Delete Items
                  </button>
                </div>
              </>
            )}
          </>
        )}
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-6 justify-items-stretch items-stretch gap-4 relative min-h-[20rem] sm:min-h-[40rem] w-full">
          {!filesData && (
            <div className="flex justify-center items-center absolute inset-0 text-primary">
              <LoadingSpinner className="h-10 w-10" />
            </div>
          )}
          {filesData && filesData.items.length === 0 && (
            <div className="flex flex-col justify-center items-center absolute inset-0 text-lg sm:text-3xl text-zinc-400 font-semibold rounded-3xl">
              {!router.query['searchBy.filename'] && (
                <>
                  <p>Nothing has been uploaded yet</p>
                  <Button
                    rounded="rounded-lg"
                    size="h-8"
                    type="button"
                    variant="primary"
                    extraCSSClasses="px-4 mt-6 text-sm font-normal"
                    onClick={() => router.push('/admin/media/add-new')}
                  >
                    Add New File
                  </Button>
                </>
              )}
              {router.query['searchBy.filename'] && (
                <>
                  <p>No search result</p>
                  <Button
                    rounded="rounded-lg"
                    size="h-8"
                    type="button"
                    variant="primary"
                    extraCSSClasses="px-4 mt-6 text-sm font-normal"
                    onClick={() => {
                      delete router.query['searchBy.filename'];
                      router.push(router);
                    }}
                  >
                    Back to Library
                  </Button>
                </>
              )}
            </div>
          )}
          {filesData &&
            filesData.items.length > 0 &&
            filesData.items.map((file, idx) => (
              <MediaFileCard
                {...file}
                fileKey={file.key}
                swrKey={swrKey}
                key={idx}
                itemsLength={filesData.items.length}
              />
            ))}
        </div>
        {filesData && filesData.items.length > 0 && (
          <AdminPagination
            className="my-6"
            fieldsBgClassName="bg-light"
            baseUrl={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/media`}
            currentPage={
              router.query.page
                ? +router.query.page
                : filesData?.meta.currentPage
            }
            totalPages={filesData?.meta.totalPages}
          />
        )}
      </div>
    </>
  );
};

export default AdminMedia;
