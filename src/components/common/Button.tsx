import React, { FC, PropsWithChildren } from 'react';

export interface IButtonProps {
  id?: string;
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
    | 'light-outline'
    | 'link';
  size: any;
  rounded: any;
  block?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
        outline-none
        disabled:bg-zinc-100
        disabled:text-zinc-400
        disabled:hoverable:hover:bg-zinc-100
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
        outline-none
        disabled:bg-zinc-100
        disabled:text-zinc-400
        disabled:hoverable:hover:bg-zinc-100
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
        outline-none
        disabled:bg-zinc-100
        disabled:text-zinc-400
        disabled:hoverable:hover:bg-zinc-100
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
        outline-none
        disabled:bg-zinc-100
        disabled:text-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        focus:ring-2
        focus:ring-offset-2
        focus:ring-danger-dark
        `;
      break;
    case 'primary-outline':
      btnVariantCssClass = `
        bg-transparent
        text-primary
        border-solid 
        border-2 
        border-primary 
        outline-none
        focus:border-primary/20
        hoverable:hover:bg-primary 
        hoverable:hover:text-light 
        disabled:text-zinc-400
        disabled:border-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        disabled:hoverable:hover:text-zinc-400
        focus:ring-2
        focus:ring-offset-2
        focus:ring-primary
        `;
      break;
    case 'success-outline':
      btnVariantCssClass = `
        bg-transparent
        text-success
        border-solid 
        border-2 
        border-success 
        outline-none
        hoverable:hover:bg-success 
        hoverable:hover:text-light 
        disabled:text-zinc-400
        disabled:border-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        disabled:hoverable:hover:text-zinc-400
        focus:ring-2
        focus:ring-offset-2
        focus:ring-success
        `;
      break;
    case 'warning-outline':
      btnVariantCssClass = `
        bg-transparent
        text-warning
        border-solid 
        border-2 
        border-warning 
        outline-none
        hoverable:hover:bg-warning 
        hoverable:hover:text-light 
        disabled:text-zinc-400
        disabled:border-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        disabled:hoverable:hover:text-zinc-400
        focus:ring-2
        focus:ring-offset-2
        focus:ring-warning
        `;
      break;
    case 'danger-outline':
      btnVariantCssClass = `
        bg-transparent
        text-danger
        border-solid 
        border-2 
        border-danger 
        outline-none
        hoverable:hover:bg-danger 
        hoverable:hover:text-light 
        disabled:text-zinc-400
        disabled:border-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        disabled:hoverable:hover:text-zinc-400
        focus:ring-2
        focus:ring-offset-2
        focus:ring-danger
        `;
      break;
    case 'light-outline':
      btnVariantCssClass = `
        bg-transparent
        text-light
        border-solid 
        border-2
        border-light 
        outline-none
        hoverable:hover:bg-light 
        hoverable:hover:text-dark 
        disabled:text-zinc-400
        disabled:border-zinc-400
        disabled:hoverable:hover:bg-zinc-100
        disabled:hoverable:hover:text-zinc-400
        focus:ring-2
        focus:ring-offset-2
        focus:ring-offset-primary/60
        focus:bg-light
        focus:text-dark
        focus:ring-light
          `;
      break;
    case 'link':
      btnVariantCssClass = `
        text-primary
        outline-hidden
        hoverable:hover:text-primary-dark 
        `;
      break;
    default:
      btnVariantCssClass = '';
      break;
  }

  const btnIsBlockCssClass: string = props.block ? 'block w-full' : '';

  return (
    <button
      id={props.id ? props.id : undefined}
      type={props.type}
      className={`
        ${btnVariantCssClass} 
        ${btnIsBlockCssClass} 
        ${props.size}
        ${props.rounded}
        ${props.extraCSSClasses}
        `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
