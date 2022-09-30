import React, { FC } from 'react';

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
  name: string;
}

const FormikInput: FC<IFormikInput> = ({
  field,
  form: { touched, errors },
  id,
  className,
  type,
  placeholder,
  name,
  ...props
}) => {
  const cssClasses = `bg-zinc-100 placeholder-zinc-400 text-zinc-800 border-0 
    ${
      errors[field.name] && touched[field.name]
        ? 'border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
        : 'focus:border-2 focus:border-primary focus:bg-light'
    } ${
    className ? className : 'block w-full h-11 rounded-xl text-xs sm:text-sm'
  }`;
  return (
    <>
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
    </>
  );
};

export default FormikInput;
