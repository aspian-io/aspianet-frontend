import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { Session } from 'next-auth';
import Image from 'next/image';
import React, { FC, useId, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminUserAgent } from '../../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../../lib/helpers/img-placeholder';
import { reloadSession } from '../../../../lib/next-auth/session';
import { AvatarSourceEnum } from '../../../../models/auth/common';
import { INestError } from '../../../../models/common/error';
import { IUserEntity } from '../../../../models/users/admin/user';
import ConfirmModal from '../../../common/ConfirmModal';
import DropdownMenu from '../../../common/DropdownMenu';
import LoadingSpinner from '../../../common/LoadingSpinner';
import AdminCard from '../../common/AdminCard';

interface IProps {
  userData: IUserEntity;
  session: Session | null;
}

const AvatarCard: FC<IProps> = ({ userData, session }) => {
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const avatarInitialValue: { avatar?: File } = { avatar: undefined };
  const avatarUploadFieldId = useId();

  const getUserAvatarSrc = () => {
    if (session?.user.avatar) {
      return session?.user.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${session?.user.avatar}`
        : session?.user.avatar;
    }
    return '';
  };

  return (
    <>
      <ConfirmModal
        onCancel={() => setRemoveConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminUserAgent.deleteAvatar(session!.user.id, session);
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
      <Formik
        initialValues={avatarInitialValue}
        onSubmit={async (value, { resetForm }) => {
          if (value.avatar) {
            const formData = new FormData();
            formData.append('avatar', value.avatar);

            try {
              await AdminUserAgent.uploadAvatar(
                session,
                session!.user.id,
                formData
              );
              reloadSession();
              resetForm();
            } catch (error) {
              resetForm();
              const err = error as AxiosError<INestError>;
              if (err.response?.data.statusCode === 400) {
                console.log('ERRRRRRRROOOOOOOOOORRRRRR RESPONSE IS: ', err);
                toast.error(
                  'File size must be less than 100KB and file type must be JPG or PNG',
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
          <Form className="w-full lg:w-72">
            <Field
              id={avatarUploadFieldId}
              type="file"
              name="avatar"
              className="hidden"
              disabled={isSubmitting}
              value={undefined}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.length) {
                  setFieldValue('avatar', e.target.files[0]);
                  await submitForm();
                  e.target.value = '';
                }
              }}
            />

            <AdminCard className="flex flex-col justify-start items-center min-w-max h-72">
              <DropdownMenu className="self-end mb-6">
                <DropdownMenu.Item
                  onClick={() => {
                    document.getElementById(avatarUploadFieldId)?.click();
                  }}
                >
                  Change Avatar
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => setRemoveConfirm(true)}>
                  Remove Avatar
                </DropdownMenu.Item>
              </DropdownMenu>
              <div>
                {session?.user.avatar ? (
                  <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-zinc-100 hoverable:group-hover:ring-offset-0 transition-all duration-700">
                    {isSubmitting ? (
                      <div className="absolute flex justify-center items-center bg-primary/60 w-full h-full">
                        <LoadingSpinner className="w-8 h-8 text-light" />
                      </div>
                    ) : (
                      <Image
                        className="hoverable:group-hover:scale-110 hoverable:group-hover:rotate-3 transition-transform duration-700"
                        src={getUserAvatarSrc()}
                        fill
                        placeholder="blur"
                        blurDataURL={imgPlaceholderDataURL}
                        alt="Avatar"
                      />
                    )}
                  </div>
                ) : (
                  <div className="relative flex justify-center items-center h-28 w-28 rounded-full overflow-hidden bg-primary text-light text-4xl">
                    {isSubmitting ? (
                      <div className="absolute flex justify-center items-center bg-primary/60 w-full h-full">
                        <LoadingSpinner className="w-8 h-8 text-light" />
                      </div>
                    ) : (
                      session?.user.firstName[0].toUpperCase()
                    )}
                  </div>
                )}
              </div>
              <div className="text-dark text-lg mt-6">
                Welcome back {session?.user.firstName}!
              </div>
              {userData.role && (
                <div className="px-3 py-1 bg-danger text-light text-xs rounded-lg mt-2 mb-6">
                  {userData.role}
                </div>
              )}
            </AdminCard>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AvatarCard;
