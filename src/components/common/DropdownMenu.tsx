import React, {
  FC,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
} from 'react';

interface IDropdownMenu extends FC<PropsWithChildren<IDropdownProps>> {
  Item: FC<PropsWithChildren<IItemProps>>;
}

interface IDropdownProps {
  className?: string;
  btnValue?: JSX.Element;
  alignment?: 'right' | 'left';
  dropDownFromTopCss?: string;
  btnColorCssClass?: string;
}

interface IItemProps {
  onClick?: Function;
}

const DropdownMenu: IDropdownMenu = ({
  className,
  btnValue,
  alignment = 'right',
  dropDownFromTopCss = 'top-9',
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownBtn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.current?.contains(e.target as any)) {
        setMenuOpen(false);
      }
    });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className="text-dark/50 hoverable:hover:text-dark cursor-pointer transition-all duration-300"
        onClick={() => setMenuOpen((prev) => !prev)}
        ref={dropdownBtn}
      >
        {!btnValue && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        )}
        {btnValue}
      </div>

      <div
        className={`${
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } flex flex-col min-w-[100px] absolute drop-shadow ${dropDownFromTopCss} ${
          alignment === 'right' ? 'right-0' : 'left-0'
        } p-2 text-zinc-700 z-40 bg-light text-sm rounded-xl transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

const Item: FC<PropsWithChildren<IItemProps>> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="flex justify-between items-center min-w-max px-4 py-2 rounded-lg text-xs hoverable:hover:bg-primary hoverable:hover:text-light transition-colors duration-300"
      onClick={() => (onClick ? onClick() : {})}
    >
      {children}
    </button>
  );
};

DropdownMenu.Item = Item;

export default DropdownMenu;
