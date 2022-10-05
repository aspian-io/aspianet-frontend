import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useId, FC } from 'react';
import { UserAgent } from '../../../../../lib/agent';
import { reloadSession } from '../../../../../lib/session';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../common/LoadingSpinner';

interface IProps {
  responsive?: boolean;
}

const ChangeAvatar: FC<IProps> = ({ responsive = false }) => {
  const { data: session } = useSession();
  const responsiveAvatarInitialValue: { avatar?: File } = { avatar: undefined };
  const responsiveProfilePhotoId = useId();
  const profilePhotoId = useId();

  return (
    <>
      {responsive ? (
        <Formik
          initialValues={responsiveAvatarInitialValue}
          onSubmit={async (value, { resetForm }) => {
            if (value.avatar) {
              const formData = new FormData();
              formData.append('avatar', value.avatar);

              try {
                await UserAgent.uploadAvatar(session, formData);
                reloadSession();
              } catch (error) {
                resetForm();
                const err = error as AxiosError<INestError>;
                if (err.response?.data.statusCode === 400) {
                  toast.error(
                    'File size must be less than 100KB and file type must be JPG',
                    {
                      className: 'bg-danger text-light text-sm',
                    }
                  );
                  return;
                }
                if (err.response?.data.statusCode === 401) {
                  toast.error('You are not authenticated', {
                    className: 'bg-danger text-light text-sm',
                  });
                  return;
                }
                if (err.response?.data.statusCode === 403) {
                  toast.error('The operation is forbidden', {
                    className: 'bg-danger text-light text-sm',
                  });
                  return;
                }

                toast.error('Something went wrong, please try again later.', {
                  className: 'bg-danger text-light text-sm',
                });
              }
            }
          }}
        >
          {({ isSubmitting, submitForm, setFieldValue }) => (
            <Form>
              <div className="absolute -bottom-2 -left-1 flex lg:hidden justify-center items-center border border-light p-1 bg-primary rounded-full cursor-pointer">
                <label
                  htmlFor={responsiveProfilePhotoId}
                  className="flex justify-center items-center"
                >
                  <div className="flex flex-col justify-center items-center text-light cursor-pointer">
                    {isSubmitting ? (
                      <LoadingSpinner className="w-4 h-4" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </svg>
                    )}
                  </div>
                  <Field
                    id={responsiveProfilePhotoId}
                    type="file"
                    name="avatar"
                    className="hidden"
                    disabled={isSubmitting}
                    value={undefined}
                    onChange={async (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      if (e.target.files?.length) {
                        setFieldValue('avatar', e.target.files[0]);
                        await submitForm();
                      }
                    }}
                  />
                </label>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={responsiveAvatarInitialValue}
          onSubmit={async (value, { resetForm }) => {
            if (value.avatar) {
              const formData = new FormData();
              formData.append('avatar', value.avatar);

              try {
                await UserAgent.uploadAvatar(session, formData);
                reloadSession();
              } catch (error) {
                resetForm();
                const err = error as AxiosError<INestError>;
                if (err.response?.data.statusCode === 400) {
                  toast.error(
                    'File size must be less than 100KB and file type must be JPG',
                    {
                      className: 'bg-danger text-light text-sm',
                    }
                  );
                  return;
                }
                if (err.response?.data.statusCode === 401) {
                  toast.error('You are not authenticated', {
                    className: 'bg-danger text-light text-sm',
                  });
                  return;
                }
                if (err.response?.data.statusCode === 403) {
                  toast.error('The operation is forbidden', {
                    className: 'bg-danger text-light text-sm',
                  });
                  return;
                }

                toast.error('Something went wrong, please try again later.', {
                  className: 'bg-danger text-light text-sm',
                });
              }
            }
          }}
        >
          {({ isSubmitting, submitForm, setFieldValue }) => (
            <Form>
              {isSubmitting ? (
                <div className="absolute flex justify-center items-center w-full h-full bg-primary/60 text-light">
                  <LoadingSpinner className="h-10 w-10" />
                </div>
              ) : (
                <div className="absolute flex justify-center items-center w-full h-1/2 -bottom-8 hoverable:hover:bottom-0 hoverable:hover:h-full transition-all duration-300">
                  <label
                    htmlFor={profilePhotoId}
                    className="flex flex-col justify-center items-center w-full h-full bg-primary/60 rounded-b-full hoverable:hover:rounded-full cursor-pointer transition-all duration-300"
                  >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-light">Edit</p>
                      <p className="text-xs text-light">
                        PNG, JPG (MAX. 100KB)
                      </p>
                    </div>
                    <Field
                      id={profilePhotoId}
                      type="file"
                      name="avatar"
                      className="hidden"
                      disabled={isSubmitting}
                      value={undefined}
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (e.target.files?.length) {
                          setFieldValue('avatar', e.target.files[0]);
                          await submitForm();
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ChangeAvatar;
