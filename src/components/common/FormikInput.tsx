import { useFormikContext } from 'formik';
import React, { FC, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Button from './Button';

export enum InputTypeEnum {
  text = 'text',
  password = 'password',
  email = 'email',
  number = 'number',
  url = 'url',
  date = 'date',
  datetime_local = 'datetime-local',
  month = 'month',
  week = 'week',
  time = 'time',
  search = 'search',
  tel = 'tel',
  checkbox = 'checkbox',
  radio = 'radio',
}

export interface IFormikInput {
  field: any;
  form: {
    touched: any;
    errors: any;
  };
  id?: string;
  type: InputTypeEnum;
  placeholder: string;
  className?: string;
  labelClassName?: string;
  required?: boolean;
  name: string;
  passwordEyeFromTopCssClass?: string;
  passwordEyeFromRightCssClass?: string;
}

const FormikInput: FC<IFormikInput> = ({
  field,
  form: { touched, errors },
  id,
  className,
  labelClassName,
  required = false,
  type,
  placeholder,
  name,
  passwordEyeFromRightCssClass = 'right-3',
  passwordEyeFromTopCssClass = 'top-6',
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const cssClasses = `bg-zinc-100 placeholder-zinc-400 text-zinc-800 border-0 
    ${
      errors[field.name] && touched[field.name]
        ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
        : 'focus:border-2 focus:border-primary focus:bg-light focus:ring-0'
    } ${
    className ? className : 'block w-full h-11 rounded-xl text-xs sm:text-sm'
  }`;

  // Password Input Show/Hide Button State
  const [showPassword, setShowPassword] = useState(false);

  // Date Input
  if (type === InputTypeEnum.date) {
    return (
      <div className="flex flex-col w-full">
        <label
          htmlFor={id}
          className={`${
            touched[field.name] && errors[field.name] ? 'text-danger' : ''
          } self-start text-dark text-xs ${labelClassName}`}
        >
          {required ? `* ${placeholder}` : placeholder}:
        </label>
        <ReactDatePicker
          name={name}
          id={id}
          className={cssClasses}
          placeholderText={placeholder}
          selected={field?.value ? new Date(field.value) : null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          isClearable
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          clearButtonClassName="after:bg-primary/60 hoverable:hover:after:bg-primary after:content-['×']"
          showPopperArrow={false}
        />
        {touched[field.name] && errors[field.name] && (
          <div className="mt-2 text-danger text-xs">{errors[field.name]}</div>
        )}
      </div>
    );
  }

  // Password Input
  if (type === InputTypeEnum.password) {
    return (
      <div className="relative w-full flex flex-col">
        <label
          htmlFor={id}
          className={`${
            touched[field.name] && errors[field.name] ? 'text-danger' : ''
          } self-start text-dark text-xs ${labelClassName}`}
        >
          {required ? `* ${placeholder}` : placeholder}:
        </label>
        <input
          type={showPassword ? InputTypeEnum.text : InputTypeEnum.password}
          name={name}
          id={id}
          className={`${cssClasses} w-full pr-11`}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        <Button
          rounded="rounded-full"
          size="h-6"
          type="button"
          variant="link"
          extraCSSClasses={`absolute ${passwordEyeFromTopCssClass} ${passwordEyeFromRightCssClass} text-primary/60`}
          onClick={() => setShowPassword(!showPassword)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path
              fillRule="evenodd"
              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        {touched[field.name] && errors[field.name] && (
          <div className="mt-2 text-danger text-xs">{errors[field.name]}</div>
        )}
      </div>
    );
  }

  // Other Inputs
  return (
    <div className='flex flex-col w-full'>
      <label
        htmlFor={id}
        className={`${
          touched[field.name] && errors[field.name] ? 'text-danger' : ''
        } self-start text-dark text-xs ${labelClassName}`}
      >
        {required ? `* ${placeholder}` : placeholder}:
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={cssClasses}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="mt-2 text-danger text-xs">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default FormikInput;
