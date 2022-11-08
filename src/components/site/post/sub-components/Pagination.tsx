import Link from 'next/link';
import React, { FC } from 'react';

export interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  queryString?: string;
}

const Pagination: FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  baseUrl,
  queryString,
}) => {
  const appliedCurrentPage =
    currentPage >= 1 && currentPage <= totalPages ? currentPage : 1;
  const moreThanFivePages = totalPages > 5;
  const mainSegmentNumbers: number[] =
    moreThanFivePages && appliedCurrentPage > 2
      ? [appliedCurrentPage - 1, appliedCurrentPage, appliedCurrentPage + 1]
      : [...Array(moreThanFivePages ? 4 : totalPages)].map((_, i) => i + 1);
  const mainIncludesFirstPage = mainSegmentNumbers.includes(1);
  const mainIncludesLastPage = mainSegmentNumbers.includes(totalPages);

  return (
    <div className="flex justify-center items-center w-full gap-1 md:gap-2">
      {appliedCurrentPage > 1 && (
        <Link
          href={
            queryString
              ? `${baseUrl}?page=${appliedCurrentPage - 1}&${queryString}`
              : `${baseUrl}?page=${appliedCurrentPage - 1}`
          }
        >
          <div className="flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 bg-primary text-light rounded-lg hoverable:hover:bg-primary-dark text-xs md:text-sm">
            &lt;
          </div>
        </Link>
      )}

      {!mainIncludesFirstPage && (
        <Link
          href={
            queryString
              ? `${baseUrl}?page=1&${queryString}`
              : `${baseUrl}?page=1`
          }
          key={1}
        >
          <div
            className={`flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 ${
              appliedCurrentPage === 1
                ? 'text-light bg-primary'
                : 'border-2 border-primary text-primary'
            } rounded-lg hoverable:hover:bg-primary hoverable:hover:text-light text-xs md:text-sm`}
          >
            1
          </div>
        </Link>
      )}

      {!mainIncludesFirstPage && appliedCurrentPage > 3 && (
        <div className="flex justify-center items-center w-4 h-7 pb-2 text-primary">
          ...
        </div>
      )}

      {mainSegmentNumbers.map((p) => {
        return (
          <Link
            href={
              queryString
                ? `${baseUrl}?page=${p}&${queryString}`
                : `${baseUrl}?page=${p}`
            }
            key={p}
          >
            <div
              className={`flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 ${
                appliedCurrentPage === p
                  ? 'text-light bg-primary'
                  : 'border-2 border-primary text-primary'
              } rounded-lg hoverable:hover:bg-primary hoverable:hover:text-light text-xs md:text-sm`}
            >
              {p}
            </div>
          </Link>
        );
      })}

      {!mainIncludesLastPage && appliedCurrentPage < totalPages - 2 && (
        <div className="flex justify-center items-center w-4 h-7 pb-2 text-primary">
          ...
        </div>
      )}

      {!!totalPages && !mainIncludesLastPage && (
        <Link
          href={
            queryString
              ? `${baseUrl}?page=${totalPages}&${queryString}`
              : `${baseUrl}?page=${totalPages}`
          }
          key={totalPages}
        >
          <div
            className={`flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 ${
              appliedCurrentPage === totalPages
                ? 'text-light bg-primary'
                : 'border-2 border-primary text-primary'
            } rounded-lg hoverable:hover:bg-primary hoverable:hover:text-light text-xs md:text-sm`}
          >
            {totalPages}
          </div>
        </Link>
      )}

      {appliedCurrentPage < totalPages && (
        <Link
          href={
            queryString
              ? `${baseUrl}?page=${appliedCurrentPage + 1}&${queryString}`
              : `${baseUrl}?page=${appliedCurrentPage + 1}`
          }
        >
          <div className="flex justify-center items-center min-w-[30px] px-1 md:min-w-[32px] md:px-2 h-7 bg-primary text-light rounded-lg hoverable:hover:bg-primary-dark text-xs md:text-sm">
            &gt;
          </div>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
