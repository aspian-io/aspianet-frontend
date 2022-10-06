import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import Modal from './Modal';

interface IProps extends PropsWithChildren {
  show: boolean;
  confirmLabel?: string | ReactNode;
  cancelLabel?: string | ReactNode;
  text?: string;
  onConfirm: Function;
  onConfirmLoading?: boolean;
  onCancel: Function;
  onCancelLoading?: boolean;
}

const ConfirmModal: FC<IProps> = ({
  show = false,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  text = 'Are you sure?',
  onCancel,
  onCancelLoading = false,
  onConfirm,
  onConfirmLoading = false,
  children,
}) => {
  return (
    <Modal show={show}>
      <div className="flex flex-row justify-center items-center w-full text-left">
        {children ? (
          <>{children}</>
        ) : (
          <>
            <span className="text-danger">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="ml-2">{text}</span>
          </>
        )}
      </div>
      <div className="flex justify-center items-center w-full mt-8">
        <Button
          rounded="rounded-xl"
          size="h-9"
          type="button"
          variant="primary-outline"
          extraCSSClasses="flex justify-center items-center w-24 sm:w-28"
          onClick={() => onCancel()}
          disabled={onCancelLoading || onConfirmLoading}
        >
          {onCancelLoading ? (
            <LoadingSpinner className="h-5 w-5" />
          ) : (
            cancelLabel
          )}
        </Button>
        <Button
          rounded="rounded-xl"
          size="h-9"
          type="button"
          variant="danger"
          extraCSSClasses="ml-4 flex justify-center items-center w-24 sm:w-28"
          onClick={() => onConfirm()}
          disabled={onCancelLoading || onConfirmLoading}
        >
          {onConfirmLoading ? (
            <LoadingSpinner className="h-5 w-5" />
          ) : (
            confirmLabel
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
