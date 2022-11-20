import React, { FC, PropsWithChildren } from 'react';

interface IProps {
  bgColorClassName?: string;
  className?: string;
  defaultPadding?: boolean;
}

const AdminCard: FC<PropsWithChildren<IProps>> = ({
  children,
  bgColorClassName,
  className,
  defaultPadding = true,
}) => {
  return (
    <div
      className={`${
        defaultPadding ? 'px-6 py-4' : ''
      } rounded-3xl drop-shadow-sm ${
        bgColorClassName ?? 'bg-light'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AdminCard;
