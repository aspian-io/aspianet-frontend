import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';

export interface IAdminSearchProps {
  onSubmit: (searchString: string | undefined) => any;
  className?: string;
  dropDownAlignment?: 'left' | 'right' | 'center';
  disabled?: boolean
}

const AdminSearchForm: FC<IAdminSearchProps> = ({
  className,
  onSubmit,
  dropDownAlignment = 'right',
  disabled = false
}) => {
  const [searchShow, setSearchShow] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const searchBtnRef = useRef<HTMLDivElement>(null);

  const initialValues: { search?: string } = { search: '' };
  const validationSchema = Yup.object({
    search: Yup.string().max(
      30,
      'Search value must be less than 30 characters'
    ),
  });

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
      if (!searchBtnRef.current?.contains(e.target as any)) {
        setSearchShow(false);
      }
    });
  }, []);

  return (
    <div className="relative" ref={searchBtnRef}>
      <button
        type="button"
        className={`flex justify-center items-center text-light ml-auto hoverable:hover:bg-primary-dark disabled:hoverable:hover:bg-primary rounded-md p-1 ${
          searchActive ? 'bg-primary-dark' : ''
        } ${className}`}
        onClick={() => setSearchShow((prev) => !prev)}
        disabled={disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 sm:w-4 sm:h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      <div
        className={`${
          searchShow
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } flex flex-col absolute drop-shadow-xl ${dropDownAlignmentClassNames()} top-8 p-2 text-zinc-500 font-normal bg-light text-sm rounded-xl transition-all duration-300`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await onSubmit(values.search);
            setSearchShow(false);
          }}
        >
          {({ isSubmitting, isValid, dirty, values, handleChange }) => (
            <Form>
              <fieldset>
                <div className="relative group flex flex-col sm:flex-row space-y-2 sm:space-y-0">
                  <Field
                    type={InputTypeEnum.text}
                    name="search"
                    placeholder="Search"
                    className="text-xs sm:text-sm h-9 rounded-xl sm:pr-11 group-focus-within:border-primary"
                    labelClassName="hidden"
                    component={FormikInput}
                  />
                  <button
                    type="submit"
                    className="sm:absolute sm:top-0 sm:right-0 bg-primary hoverable:hover:bg-primary-dark text-light sm:w-11 h-9 flex justify-center items-center rounded-xl sm:rounded-r-xl sm:rounded-l-none outline-hidden"
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
      </div>
    </div>
  );
};

export default AdminSearchForm;
