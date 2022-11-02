import React, { FC, useState, useEffect, useRef, useId } from 'react';
import Button from '../../../../../common/Button';

export interface IFilterToggleProps {
  onFilter: (value: boolean) => any;
  onReset?: Function;
  className?: string;
  dropDownAlignment?: 'left' | 'right' | 'center';
}

const FilterToggle: FC<IFilterToggleProps> = ({
  onFilter,
  onReset,
  className = '',
  dropDownAlignment = 'right',
}) => {
  const [filterShow, setFilterShow] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const filterBtnRef = useRef<HTMLDivElement>(null);
  const toggleId = useId();

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
        onClick={() => {
          setFilterShow((prev) => !prev);
        }}
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
        } flex absolute drop-shadow-xl ${dropDownAlignmentClassNames()} top-8 p-2 text-zinc-500 font-normal bg-light text-sm rounded-xl transition-all duration-300`}
      >
        <div className="flex justify-center items-center">
          <label
            htmlFor={toggleId}
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id={toggleId}
              value=""
              className="sr-only peer"
              onChange={(e) => {
                if (e.target.checked) {
                  onFilter(true);
                  setFilterActive(true);
                  setFilterShow(false);
                } else {
                  onFilter(false);
                  setFilterActive(true);
                  setFilterShow(false);
                }
              }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
        <Button
          type="button"
          rounded="rounded-lg"
          size="h-7"
          variant="primary-outline"
          onClick={() => {
            if (onReset) onReset();
            setFilterActive(false);
            setFilterShow(false);
          }}
          extraCSSClasses="px-2 ml-4"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterToggle;
