import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { Session } from 'next-auth';
import Image from 'next/image';
import React, { FC, useId, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { AdminUserAgent } from '../../../../../lib/axios/agent';
import { imgPlaceholderDataURL } from '../../../../../lib/helpers/img-placeholder';
import { reloadSession } from '../../../../../lib/next-auth/session';
import { AdminUserKeys } from '../../../../../lib/swr/keys';
import {
  AvatarSourceEnum,
  ClaimsEnum,
} from '../../../../../models/auth/common';
import { INestError } from '../../../../../models/common/error';
import { IUserEntity } from '../../../../../models/users/admin/user';
import { AuthGuard } from '../../../../common/AuthGuard';
import ConfirmModal from '../../../../common/ConfirmModal';
import DropdownMenu from '../../../../common/DropdownMenu';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import AdminCard from '../../../common/AdminCard';

interface IProps {
  userData: IUserEntity;
  session: Session | null;
}

const UserDetailsAvatar: FC<IProps> = ({ userData, session }) => {
  const [removeConfirm, setRemoveConfirm] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const avatarInitialValue: { avatar?: File } = { avatar: undefined };
  const avatarUploadFieldId = useId();

  const getUserAvatarSrc = () => {
    if (userData.avatar) {
      return userData.avatarSource === AvatarSourceEnum.STORAGE
        ? `${process.env.NEXT_PUBLIC_STORAGE_PROFILE_BASE_URL}/${userData.avatar}`
        : userData.avatar;
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
            await AdminUserAgent.deleteAvatar(userData.id, session);
            if (session?.user.id === userData.id) reloadSession();
            await mutate(`${AdminUserKeys.GET_USER_DETAILS}/${userData.id}`);
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
        text="Are you sure you want to delete user's avatar?"
      />
      <Formik
        initialValues={avatarInitialValue}
        onSubmit={async (value, { resetForm }) => {
          if (value.avatar) {
            const formData = new FormData();
            formData.append('avatar', value.avatar);

            try {
              await AdminUserAgent.uploadAvatar(session, userData.id, formData);
              if (session?.user.id === userData.id) reloadSession();
              await mutate(`${AdminUserKeys.GET_USER_DETAILS}/${userData.id}`);
              resetForm();
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
              <AuthGuard claims={[ClaimsEnum.ADMIN, ClaimsEnum.USER_EDIT]}>
                <DropdownMenu className="self-end">
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
              </AuthGuard>
              <div>
                {userData.avatar ? (
                  <div className="relative w-28 h-28 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2 ring-offset-zinc-100 hoverable:group-hover:ring-offset-0 transition-all duration-700">
                    {isSubmitting ? (
                      <div className="absolute flex justify-center items-center bg-primary/60 w-full h-full">
                        <LoadingSpinner className="w-8 h-8 text-light" />
                      </div>
                    ) : (
                      <Image
                        className="hoverable:group-hover:scale-110 hoverable:group-hover:rotate-3 transition-transform duration-700"
                        src={getUserAvatarSrc()}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
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
                      userData.firstName[0].toUpperCase()
                    )}
                  </div>
                )}
              </div>
              <div className="text-dark text-lg mt-6">
                {userData.firstName} {userData.lastName}
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

export default UserDetailsAvatar;
