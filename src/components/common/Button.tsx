import React, { FC, PropsWithChildren } from 'react';

export interface IButtonProps {
  type: 'button' | 'submit';
  variant:
    | 'primary'
    | 'primary-outline'
    | 'success'
    | 'success-outline'
    | 'danger'
    | 'danger-outline'
    | 'warning'
    | 'warning-outline'
    | 'link';
  size: 'h-8' | 'h-11' | 'h-14';
  rounded: 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-full';
  block?: boolean;
  extraCSSClasses?: string;
}

const Button: FC<PropsWithChildren<IButtonProps>> = (props) => {
  let btnVariantCssClass: string = '';
  // Variant Specification
  switch (props.variant) {
    case 'primary':
    case 'success':
    case 'warning':
    case 'danger':
      btnVariantCssClass = `
        text-${props.variant}-accent 
        bg-${props.variant} 
        hoverable:hover:bg-${props.variant}-dark 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-${props.variant}
        `;
      break;
    case 'primary-outline':
    case 'success-outline':
    case 'warning-outline':
    case 'danger-outline':
      const baseVariantName = props.variant.split('-')[0];
      btnVariantCssClass = `
        text-${props.variant}
        border-solid 
        border-2 
        border-${baseVariantName} 
        hoverable:hover:bg-${baseVariantName} 
        hoverable:hover:text-light 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-${baseVariantName}
        `;
      break;
    case 'link':
      btnVariantCssClass = `
        text-${props.variant}
        hoverable:hover:text-${props.variant}-dark 
        `;
    default:
      btnVariantCssClass = '';
      break;
  }

  const btnIsBlockCssClass: string = props.block ? 'block w-full' : '';

  return (
    <button
      type={props.type}
      className={`
        px-5
        ${btnVariantCssClass} 
        ${btnIsBlockCssClass} 
        ${props.size}
        ${props.rounded}
        ${props.extraCSSClasses}
        `}
    >
      {props.children}
    </button>
  );
};

export default Button;
