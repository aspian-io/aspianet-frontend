import React, { FC, PropsWithChildren } from 'react';

interface IProps {
  bgColorClassName?: string;
  className?: string;
}

const AdminCard: FC<PropsWithChildren<IProps>> = ({
  children,
  bgColorClassName,
  className,
}) => {
  return (
    <div
      className={`px-6 py-4 rounded-3xl drop-shadow-sm ${
        bgColorClassName ?? 'bg-light'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AdminCard;
