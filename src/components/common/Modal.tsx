import React, { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

interface IProps extends PropsWithChildren {
  show: boolean;
}

const ModalComponent: FC<IProps> = ({ show, children }) => {
  return (
    <>
      <div
        className={`${
          show ? 'visible opacity-100' : 'invisible opacity-0'
        } fixed z-40 w-screen h-screen bg-primary/60 transition-opacity duration-300`}
      ></div>
      <div
        className={`fixed flex ${
          show
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-4'
        } justify-center items-center z-50 w-screen h-screen px-6 transition-all duration-300`}
      >
        <div className="flex flex-col items-center justify-center w-full max-w-xl  bg-light px-4 sm:px-12 py-10 rounded-xl text-dark text-center text-xs sm:text-sm">
          {children}
        </div>
      </div>
    </>
  );
};

const Modal: FC<IProps> = ({ show, children }) => {
  return createPortal(
    <ModalComponent show={show}>{children}</ModalComponent>,
    document.querySelector('#modal')!
  );
};

export default Modal;
