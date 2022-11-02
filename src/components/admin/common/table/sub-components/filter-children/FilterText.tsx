import { Field, Form, Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import Button from '../../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../../common/FormikInput';

export interface IFilterTextProps {
  placeholder?: string;
  onFilter: (value: string) => any;
  onReset?: Function;
  className?: string;
  dropDownAlignment?: 'left' | 'right' | 'center';
}

const FilterText: FC<IFilterTextProps> = ({
  onFilter,
  onReset,
  placeholder,
  className = '',
  dropDownAlignment = 'right',
}) => {
  const [filterShow, setFilterShow] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const filterBtnRef = useRef<HTMLDivElement>(null);

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
      if (!filterBtnRef.current?.contains(e.target as any)) {
        setFilterShow(false);
      }
    });
  }, []);

  return (
    <div className="relative" ref={filterBtnRef}>
      <button
        type="button"
        className={`flex justify-center items-center text-light hoverable:hover:bg-primary-dark rounded-md p-1 ${
          filterActive ? 'bg-primary-dark' : ''
        } ${className}`}
        onClick={() => setFilterShow((prev) => !prev)}
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
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
      </button>
      <div
        className={`${
          filterShow
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } flex flex-col absolute drop-shadow-xl ${dropDownAlignmentClassNames()} top-8 p-2 text-zinc-500 font-normal bg-light text-sm rounded-xl transition-all duration-300`}
      >
        <Formik
          initialValues={{ value: '' }}
          validationSchema={Yup.object({
            value: Yup.string().max(
              30,
              'Value must be less than 30 characters'
            ),
          })}
          onSubmit={(values) => {
            onFilter(values.value);
            setFilterActive(true);
            setFilterShow(false);
          }}
        >
          {({ isValid, dirty, resetForm }) => (
            <Form>
              <div className="flex flex-col w-36">
                <Field
                  type={InputTypeEnum.text}
                  name="value"
                  placeholder={placeholder}
                  labelClassName="hidden"
                  className="text-xs sm:text-sm h-8 rounded-lg w-full flex"
                  component={FormikInput}
                />
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
                    setFilterActive(false);
                    setFilterShow(false);
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

export default FilterText;
