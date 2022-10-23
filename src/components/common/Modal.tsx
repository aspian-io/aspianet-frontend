import React, { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface IProps extends PropsWithChildren {
  onClose: Function;
  show: boolean;
}

const ModalComponent: FC<IProps> = ({ show, onClose, children }) => {
  return (
    <div
      className={`${
        show ? 'visible opacity-100' : 'invisible opacity-0'
      } fixed z-50 flex justify-center items-center h-screen w-full transition-opacity duration-300`}
    >
      <div
        className={`fixed w-full h-screen bg-primary/60`}
        onClick={() => onClose()}
      ></div>
      <div
        className={`relative flex flex-col items-center justify-center max-w-xl mx-6 my-6 bg-light px-10 sm:px-12 pt-14 pb-10 rounded-xl text-dark text-center text-xs sm:text-sm drop-shadow-2xl ${
          show
            ? 'visible opacity-100 translate-y-0 transition-all duration-300 delay-300'
            : 'invisible opacity-0 -translate-y-4 transition-all duration-300'
        }`}
      >
        <div
          className="absolute top-4 right-5 cursor-pointer text-zinc-400 hoverable:hover:text-zinc-600"
          onClick={() => onClose()}
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

const Modal: FC<IProps> = ({ show, onClose, children }) => {
  return createPortal(
    <ModalComponent show={show} onClose={onClose}>
      {children}
    </ModalComponent>,
    document.querySelector('#modal')!
  );
};

export default Modal;
