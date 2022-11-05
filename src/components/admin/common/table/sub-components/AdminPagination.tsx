import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';

export interface IAdminPaginationProps {
  totalPages?: number;
  currentPage?: number;
  baseUrl: string;
  queryString?: string;
  onSubmit: (page: number) => any;
  onItemsPerPageChange?: (items: number) => any;
  disabled?: boolean;
}

const AdminPagination: FC<IAdminPaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  baseUrl,
  queryString,
  onSubmit,
  onItemsPerPageChange,
  disabled = false,
}) => {
  const appliedCurrentPage =
    currentPage >= 1 && currentPage <= totalPages ? currentPage : 1;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  const initialValues: { page: number } = { page: appliedCurrentPage };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        router.push(
          queryString
            ? `${baseUrl}?page=${values.page}&${queryString}`
            : `${baseUrl}?page=${values.page}`
        );
        await onSubmit(values.page);
      }}
    >
      {({ isSubmitting, setFieldValue, resetForm }) => (
        <div
          className={`${
            disabled
              ? 'hidden'
              : 'flex flex-col sm:flex-row justify-between items-center w-full'
          }`}
        >
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center space-x-2">
              {appliedCurrentPage > 1 && (
                <Link
                  href={
                    queryString
                      ? `${baseUrl}?page=${
                          appliedCurrentPage - 1
                        }&${queryString}`
                      : `${baseUrl}?page=${appliedCurrentPage - 1}`
                  }
                >
                  <a
                    onClick={() =>
                      resetForm({ values: { page: appliedCurrentPage - 1 } })
                    }
                  >
                    <div className="flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 bg-primary text-light rounded-lg hoverable:hover:bg-primary-dark text-xs md:text-sm">
                      &lt;
                    </div>
                  </a>
                </Link>
              )}

              <Form>
                <fieldset>
                  <div className="flex justify-center items-center">
                    <div className="relative group">
                      <Field
                        type={InputTypeEnum.text}
                        name="page"
                        placeholder="Page"
                        className="text-xs h-7 w-20 rounded-lg pr-8 pl-1 border-primary border-2 text-center"
                        labelClassName="hidden"
                        component={FormikInput}
                      />
                      <button
                        type="submit"
                        className="absolute top-0 right-0 bg-primary hoverable:hover:bg-primary-dark text-light text-xs w-7 h-7 flex justify-center items-center rounded-r-lg outline-hidden"
                      >
                        {isSubmitting ? (
                          <LoadingSpinner className="w-3 h-3" />
                        ) : (
                          <>Go</>
                        )}
                      </button>
                    </div>
                  </div>
                </fieldset>
              </Form>

              {appliedCurrentPage < totalPages && (
                <Link
                  href={
                    queryString
                      ? `${baseUrl}?page=${
                          appliedCurrentPage + 1
                        }&${queryString}`
                      : `${baseUrl}?page=${appliedCurrentPage + 1}`
                  }
                >
                  <a
                    onClick={() =>
                      resetForm({ values: { page: appliedCurrentPage + 1 } })
                    }
                  >
                    <div className="flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 bg-primary text-light rounded-lg hoverable:hover:bg-primary-dark text-xs md:text-sm">
                      &gt;
                    </div>
                  </a>
                </Link>
              )}
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Page {appliedCurrentPage} From {totalPages}
            </div>
          </div>
          <div className="hidden sm:flex self-start">
            <select
              name="gender"
              className={`text-xs h-7 py-0 bg-zinc-100 border-0 rounded-lg text-dark focus:text-dark focus:border-2 focus:border-primary focus:bg-light`}
              value={router.query['limit'] ? +router.query['limit'] : 10}
              onChange={(e) => {
                setItemsPerPage(
                  router.query['limit'] ? +router.query['limit'] : 10
                );
                router.push(
                  queryString
                    ? `${baseUrl}?page=${appliedCurrentPage}&limit=${+e.target
                        .value}&${queryString}`
                    : `${baseUrl}?page=${appliedCurrentPage}&limit=${+e.target
                        .value}`
                );
                if (onItemsPerPageChange) onItemsPerPageChange(+e.target.value);
              }}
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={30}>30 / Page</option>
              <option value={40}>40 / Page</option>
              <option value={50}>50 / Page</option>
            </select>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AdminPagination;
