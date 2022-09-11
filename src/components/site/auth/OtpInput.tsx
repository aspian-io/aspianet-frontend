import React, { FC } from 'react';
import Input, { InputTypeEnum } from '../../common/Input';

export interface IOtpInputProps {
  extraCssClasses?: string;
}

const OtpInput: FC<IOtpInputProps> = ({ extraCssClasses }) => {
  const otpInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(+e.target.value)) e.target.value = '';
  };

  return (
    <Input
      type={InputTypeEnum.text}
      placeholderText="Enter token here..."
      minLength={6}
      maxLength={6}
      rounded="rounded-xl"
      size="h-11"
      block
      onChange={otpInputOnChange}
      extraCSSClasses={extraCssClasses}
    />
  );
};

export default OtpInput;
