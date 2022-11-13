import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import {
  AdminUserDetailsSecurityInfo,
  IUserEntity,
} from '../../../../../models/users/admin/user';
import * as Yup from 'yup';
import Modal from '../../../../common/Modal';
import { Field, Form, Formik } from 'formik';
import { AdminUserAgent } from '../../../../../lib/axios/agent';
import { AdminUserKeys } from '../../../../../lib/swr/keys';
import { reloadSession } from '../../../../../lib/next-auth/session';
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import Button from '../../../../common/Button';
import LoadingSpinner from '../../../../common/LoadingSpinner';

interface IProps {
  show: boolean;
  onCancel: Function;
  userData: IUserEntity;
  onSuccess: Function;
}

const UserDetailsSecurityInfoForm: FC<IProps> = ({
  onCancel,
  onSuccess,
  show,
  userData,
}) => {
  const { data: session } = useSession();

  const validationSchema = Yup.object({
    role: Yup.string()
      .nullable()
      .max(50, 'Role must be less than 50 characters'),
    suspend: Yup.date().nullable(),
  });

  return (
    <Modal show={show} onClose={() => onCancel()}>
      <Formik
        initialValues={new AdminUserDetailsSecurityInfo(userData)}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const user = await AdminUserAgent.updateUser(
              userData.id,
              values,
              session
            );
            await mutate(`${AdminUserKeys.GET_USER_DETAILS}/${userData.id}`);
            if (userData.id === session?.user.id) reloadSession();
            toast.success(
              'Security information has been updated successfully.',
              {
                className: 'bg-success text-light',
              }
            );
            const result = new AdminUserDetailsSecurityInfo(user);
            resetForm({ values: result });
            onSuccess();
          } catch (error) {
            const err = error as AxiosError<INestError>;
            if (err.response?.data.statusCode === 400) {
              return toast.error(
                'Something went wrong, check entered information and try again.',
                {
                  className: 'bg-danger text-light',
                }
              );
            }
            toast.error('Something went wrong, please try again later.', {
              className: 'bg-danger text-light',
            });
          }
        }}
      >
        {({
          isSubmitting,
          handleBlur,
          handleChange,
          isValid,
          dirty,
          values,
        }) => (
          <Form>
            <fieldset disabled={isSubmitting}>
              <div className="space-y-4">
                <Field
                  type={InputTypeEnum.text}
                  name="role"
                  placeholder="Role"
                  className="text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.date}
                  name="suspend"
                  placeholder="Suspend"
                  className="text-xs sm:text-sm h-10 rounded-xl w-full"
                  component={FormikInput}
                />
                <div className="flex justify-start items-center text-xs text-dark">
                  <div className="mr-2">Account Activation:</div>
                  <label
                    htmlFor="isActivated"
                    className="inline-flex relative items-center cursor-pointer ml-auto"
                  >
                    <input
                      type="checkbox"
                      name="isActivated"
                      id="isActivated"
                      value=""
                      className="sr-only peer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.isActivated}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex justify-start items-center text-xs text-dark">
                  <div className="mr-2">Email Verification:</div>
                  <label
                    htmlFor="emailVerified"
                    className="inline-flex relative items-center cursor-pointer ml-auto"
                  >
                    <input
                      type="checkbox"
                      name="emailVerified"
                      id="emailVerified"
                      value=""
                      className="sr-only peer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.emailVerified}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex justify-start items-center text-xs text-dark">
                  <div className="mr-2">Mobile Phone Verification:</div>
                  <label
                    htmlFor="mobilePhoneVerified"
                    className="inline-flex relative items-center cursor-pointer ml-auto"
                  >
                    <input
                      type="checkbox"
                      name="mobilePhoneVerified"
                      id="mobilePhoneVerified"
                      value=""
                      className="sr-only peer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.mobilePhoneVerified}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center w-full mt-8">
                <Button
                  rounded="rounded-xl"
                  size="h-9"
                  type="button"
                  variant="primary-outline"
                  extraCSSClasses="flex justify-center items-center w-24 sm:w-28"
                  onClick={() => onCancel()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  rounded="rounded-xl"
                  size="h-9"
                  type="submit"
                  variant="success"
                  extraCSSClasses="ml-4 flex justify-center items-center w-24 sm:w-28"
                  disabled={isSubmitting || !(isValid && dirty)}
                >
                  {isSubmitting ? (
                    <LoadingSpinner className="h-5 w-5" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserDetailsSecurityInfoForm;
