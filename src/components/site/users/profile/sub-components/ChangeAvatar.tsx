import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useState, useId, FC } from 'react';
import { UserAgent } from '../../../../../lib/agent';
import { reloadSession } from '../../../../../lib/session';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Button from '../../../../common/Button';
import ConfirmModal from '../../../../common/ConfirmModal';

interface IProps {
  responsive?: boolean;
  noAvatarMode?: boolean;
}

const ChangeAvatar: FC<IProps> = ({
  responsive = false,
  noAvatarMode = false,
}) => {
  const { data: session } = useSession();
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const responsiveAvatarInitialValue: { avatar?: File } = { avatar: undefined };
  const responsiveProfilePhotoId = useId();
  const profilePhotoId = useId();

  const removeAvatar = async () => {
    try {
      setRemoveLoading(true);
      await UserAgent.deleteAvatar(session);
      toast.success('Your avatar has been removed successfully.', {
        className: 'bg-success text-light text-sm',
      });
      reloadSession();
      setRemoveLoading(false);
    } catch (error) {
      setRemoveLoading(false);
      const err = error as AxiosError<INestError>;
      if (err.response?.data.statusCode === 403) {
        toast.error('Forbidden resource', {
          className: 'bg-danger text-light text-sm',
        });
        return;
      }

      toast.error('Something went wrong. Please try again later.', {
        className: 'bg-danger text-light text-sm',
      });
    }
  };

  return (
    <>
      <ConfirmModal
        onCancel={() => setRemoveConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await UserAgent.deleteAvatar(session);
            reloadSession();
            setRemoveLoading(false);
            setRemoveConfirm(false);
          } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
          }
        }}
        show={removeConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete your avatar?"
      />
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
              <div className="absolute -bottom-3 -left-2 flex lg:hidden justify-center items-center border border-light p-1 bg-primary rounded-full cursor-pointer">
                <label
                  htmlFor={responsiveProfilePhotoId}
                  className="flex justify-center items-center"
                >
                  <div className="flex flex-col justify-center items-center text-light cursor-pointer">
                    {isSubmitting ? (
                      <LoadingSpinner className="w-4 h-4" />
                    ) : (
                      <>
                        {!noAvatarMode ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                          </svg>
                        )}
                      </>
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
              {session?.user.avatar && (
                <div className="absolute -bottom-3 left-8 flex lg:hidden justify-center items-center border border-light p-1 bg-danger rounded-full cursor-pointer">
                  <button
                    className="text-light"
                    onClick={async () => setRemoveConfirm(true)}
                    disabled={isSubmitting || removeLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
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
              <>
                {!noAvatarMode ? (
                  <div className="absolute flex justify-center items-center w-full h-1/2 -bottom-8 hoverable:hover:bottom-0 hoverable:hover:h-full transition-all duration-300">
                    {isSubmitting ? (
                      <LoadingSpinner className="h-10 w-10" />
                    ) : (
                      <label
                        htmlFor={profilePhotoId}
                        className="flex flex-col justify-center items-center w-full h-full pt-12 pb-2 bg-primary/60 rounded-b-full hoverable:hover:rounded-full hoverable:hover:pt-2 cursor-pointer transition-all duration-300"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <p className="mb-4 text-sm text-light">Edit</p>
                          <p className="text-xs text-light">
                            PNG, JPG (MAX. 100KB)
                          </p>
                          <Button
                            rounded="rounded-full"
                            size="h-8"
                            type="button"
                            variant="danger"
                            disabled={isSubmitting || removeLoading}
                            onClick={async () => setRemoveConfirm(true)}
                            extraCSSClasses="text-light text-xs mt-2 px-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
                              <path
                                fillRule="evenodd"
                                d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zm5.22 1.72a.75.75 0 011.06 0L10 10.94l1.72-1.72a.75.75 0 111.06 1.06L11.06 12l1.72 1.72a.75.75 0 11-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 01-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
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
                    )}
                  </div>
                ) : (
                  <>
                    {isSubmitting ? (
                      <LoadingSpinner className="h-10 w-10" />
                    ) : (
                      <label
                        htmlFor={profilePhotoId}
                        className="cursor-pointer"
                      >
                        <div className="flex flex-col justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                          >
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                          </svg>
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
                    )}
                  </>
                )}
              </>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default ChangeAvatar;
