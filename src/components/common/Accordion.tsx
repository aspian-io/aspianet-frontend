import React, { FC, PropsWithChildren, useState } from 'react';

interface IProps {
  title: string | JSX.Element;
  expandInitialState?: boolean;
  borderClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onExpand?: Function;
}

const Accordion: FC<PropsWithChildren<IProps>> = ({
  title,
  expandInitialState = false,
  borderClassName = 'border-zinc-100',
  headerClassName = 'bg-zinc-100 text-sm text-zinc-500',
  bodyClassName,
  children,
  onExpand = () => {},
}) => {
  const [expand, setExpand] = useState(expandInitialState);

  return (
    <div
      className={`flex flex-col justify-start items-start relative rounded-2xl border-2 ${borderClassName} w-full shadow-sm ${
        expand ? '' : 'overflow-hidden'
      }`}
    >
      <div
        className={`flex flex-row justify-start items-center w-full rounded-t-xl p-3 ${headerClassName} cursor-pointer`}
        onClick={async () => {
          setExpand((prev) => !prev);
          await onExpand();
        }}
      >
        <span className="font-semibold">{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ml-auto ${
            expand ? '-rotate-90' : 'rotate-0'
          } transition-transform duration-300`}
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div
        className={`w-full ${
          expand
            ? 'max-h-[2600px] px-3 py-3 visible'
            : 'max-h-0 px-3 py-0 invisible overflow-hidden'
        } transition-all duration-300 ${bodyClassName}`}
      >
        {expand && children}
      </div>
    </div>
  );
};

export default Accordion;
