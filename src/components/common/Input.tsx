import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

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

export interface IInputProps {
  type: InputTypeEnum;
  placeholderText: string;
  rounded: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  size: 'h-11' | 'h-14';
  name?: string;
  id?: string;
  resetStyle?: boolean;
  block?: boolean;
  extraCSSClasses?: string;
}

export interface IInputHandle {
  focus: () => void | undefined;
}

const Input = forwardRef<IInputHandle, IInputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const resetStyle = props.resetStyle === undefined ? false : props.resetStyle;
  const extraCSSClasses = resetStyle
    ? props.extraCSSClasses
    : `bg-zinc-100 placeholder-zinc-400 text-zinc-800 border-0 focus:border-2 focus:border-primary focus:bg-light ${props.extraCSSClasses}`;
  const inputIsBlockCssClass: string = props.block ? 'block w-full' : '';

  const focus = () => inputRef.current?.focus();

  useImperativeHandle(ref, () => ({
    focus,
  }));

  return (
    <input
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholderText}
      ref={inputRef}
      className={`
        ${inputIsBlockCssClass}
        ${extraCSSClasses}
        ${props.rounded}
        ${props.size}
      `}
    />
  );
});

Input.displayName = 'Input';

export default Input;
