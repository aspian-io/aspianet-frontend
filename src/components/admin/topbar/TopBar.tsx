import React, { FC } from 'react';

interface IProps {
  title: string;
}

const TopBar: FC<IProps> = ({ title }) => {
  return (
    <div className="pt-9 pb-6 text-center text-dark text-2xl">
      <h3 className='relative font-semibold before:absolute before:w-9 before:h-9 before:rounded-lg before:bg-primary-light/50 before:-left-4 before:-top-1 before:-z-10'>{title}</h3>
    </div>
  );
};

export default TopBar;
