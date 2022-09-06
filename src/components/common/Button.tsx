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
      btnVariantCssClass = `
        text-primary-accent 
        bg-primary
        hoverable:hover:bg-primary-dark
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary-dark
        `;
      break;
    case 'success':
      btnVariantCssClass = `
        text-success-accent 
        bg-success
        hoverable:hover:bg-success-dark
        focus:ring-2
        focus:ring-offset-2
        focus:ring-success-dark
        `;
      break;
    case 'warning':
      btnVariantCssClass = `
        text-warning-accent 
        bg-warning
        hoverable:hover:bg-warning-dark
        focus:ring-2
        focus:ring-offset-2
        focus:ring-warning-dark
        `;
      break;
    case 'danger':
      btnVariantCssClass = `
        text-danger-accent 
        bg-danger
        hoverable:hover:bg-danger-dark
        focus:ring-2
        focus:ring-offset-2
        focus:ring-danger-dark
        `;
      break;
    case 'primary-outline':
      btnVariantCssClass = `
        text-primary
        border-solid 
        border-2 
        border-primary 
        hoverable:hover:bg-primary 
        hoverable:hover:text-light 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary
        `;
      break;
    case 'success-outline':
      btnVariantCssClass = `
        text-success
        border-solid 
        border-2 
        border-success 
        hoverable:hover:bg-success 
        hoverable:hover:text-light 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-success
        `;
      break;
    case 'warning-outline':
      btnVariantCssClass = `
        text-warning
        border-solid 
        border-2 
        border-warning 
        hoverable:hover:bg-warning 
        hoverable:hover:text-light 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-warning
        `;
      break;
    case 'danger-outline':
      btnVariantCssClass = `
        text-danger
        border-solid 
        border-2 
        border-danger 
        hoverable:hover:bg-danger 
        hoverable:hover:text-light 
        focus:ring-2
        focus:ring-offset-2
        focus:ring-danger
        `;
      break;
    case 'link':
      btnVariantCssClass = `
        text-primary
        hoverable:hover:text-primary-dark 
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
        px-2
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
