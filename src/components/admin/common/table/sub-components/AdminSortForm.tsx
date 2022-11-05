import { Field, Form, Formik } from 'formik';
import React, { FC, useState, useEffect, useRef, useId } from 'react';
import Button from '../../../../common/Button';

export interface IAdminSortProps {
  onSortChange: (sort: 'ASC' | 'DESC' | undefined) => any;
  onReset?: Function;
  className?: string;
  dropDownAlignment?: 'left' | 'right' | 'center';
  disabled?: boolean;
}

const AdminSortForm: FC<IAdminSortProps> = ({
  onSortChange,
  onReset,
  className,
  dropDownAlignment = 'right',
  disabled = false,
}) => {
  const [sortShow, setSortShow] = useState(false);
  const [sortActive, setSortActive] = useState(false);
  const sortBtnRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const inputAscLabelId = useId();
  const inputDescLabelId = useId();

  function dropDownAlignmentClassNames() {
    if (dropDownAlignment === 'right') {
      return 'right-0';
    }
    if (dropDownAlignment === 'center') {
      return 'right-0 translate-x-1/2';
    }
    if (dropDownAlignment === 'left') {
      return 'left-0';
    }
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (
        !sortBtnRef.current?.contains(e.target as any) &&
        !labelRef.current?.contains(e.target as any)
      ) {
        setSortShow(false);
      }
    });
  }, []);

  return (
    <div className="relative" ref={sortBtnRef}>
      <button
        type="button"
        className={`flex justify-center items-center text-light hoverable:hover:bg-primary-dark disabled:hoverable:hover:bg-primary rounded-md p-1 ${
          sortActive ? 'bg-primary-dark' : ''
        } ${className}`}
        onClick={() => setSortShow((prev) => !prev)}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3 h-3 sm:w-4 sm:h-4"
        >
          <path
            fillRule="evenodd"
            d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`${
          sortShow
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } flex flex-col absolute drop-shadow-xl ${dropDownAlignmentClassNames()} top-8 p-2 text-zinc-500 font-normal bg-light text-sm rounded-xl transition-all duration-300`}
      >
        <Formik
          initialValues={{ sort: undefined }}
          onSubmit={(values) => {
            onSortChange(values.sort);
            setSortActive(true);
            setSortShow(false);
          }}
        >
          {({ isValid, dirty, resetForm }) => (
            <Form className="w-36">
              <div className="flex items-center mb-4">
                <Field
                  name="sort"
                  id={inputAscLabelId}
                  type="radio"
                  value="ASC"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor={inputAscLabelId}
                  className="ml-2 text-sm font-medium text-zinc-700"
                >
                  Ascending
                </label>
              </div>
              <div className="flex items-center mb-4">
                <Field
                  name="sort"
                  id={inputDescLabelId}
                  type="radio"
                  value="DESC"
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-0 focus:ring-offset-0"
                />
                <label
                  htmlFor={inputDescLabelId}
                  className="ml-2 text-sm font-medium text-zinc-700"
                >
                  Descending
                </label>
              </div>
              <div className="flex justify-between items-center w-full mt-2">
                <Button
                  type="submit"
                  rounded="rounded-lg"
                  size="h-8"
                  variant="primary"
                  disabled={!(isValid && dirty)}
                  extraCSSClasses="px-3.5"
                >
                  Apply
                </Button>
                <Button
                  type="button"
                  rounded="rounded-lg"
                  size="h-8"
                  variant="primary-outline"
                  onClick={() => {
                    resetForm();
                    if (onReset) onReset();
                    setSortActive(false);
                    setSortShow(false);
                  }}
                  extraCSSClasses="px-3.5"
                >
                  Reset
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminSortForm;
