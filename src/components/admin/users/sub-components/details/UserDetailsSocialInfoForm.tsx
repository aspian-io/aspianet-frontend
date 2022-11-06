import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import {
  AdminUserSocialInfo,
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

const UserDetailsSocialInfoForm: FC<IProps> = ({
  onCancel,
  onSuccess,
  show,
  userData,
}) => {
  const { data: session } = useSession();
  const webAddressRegex =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const validationSchema = Yup.object({
    website: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'Website address should be more than 5 characters')
      .max(50, 'Website address should be less than 50 characters'),
    facebook: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'Facebook address should be more than 5 characters')
      .max(50, 'Facebook address should be less than 50 characters'),
    twitter: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'Twitter address should be more than 5 characters')
      .max(50, 'Twitter address should be less than 50 characters'),
    instagram: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'Instagram address should be more than 5 characters')
      .max(50, 'Instagram address should be less than 50 characters'),
    linkedIn: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'LinkedIn address should be more than 5 characters')
      .max(50, 'LinkedIn address should be less than 50 characters'),
    pinterest: Yup.string()
      .nullable()
      .matches(webAddressRegex, 'Please enter a standard URL')
      .min(5, 'Pinterest address should be more than 5 characters')
      .max(50, 'Pinterest address should be less than 50 characters'),
  });

  return (
    <Modal show={show} onClose={() => onCancel()}>
      <Formik
        initialValues={new AdminUserSocialInfo(userData)}
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
              'The user social network information has been updated successfully.',
              {
                className: 'bg-success text-light',
              }
            );
            const result = new AdminUserSocialInfo(user);
            resetForm({ values: result });
            onSuccess();
          } catch (error) {
            const err = error as AxiosError<INestError>;
            if (err.response?.data.statusCode === 400) {
              toast.error(
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
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          isValid,
          dirty,
        }) => (
          <Form>
            <fieldset disabled={isSubmitting}>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="website"
                    placeholder="Website"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="facebook"
                    placeholder="Facebook"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="instagram"
                    placeholder="Instagram"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="twitter"
                    placeholder="Twitter"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="linkedIn"
                    placeholder="LinkedIn"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="pinterest"
                    placeholder="Pinterest"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
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

export default UserDetailsSocialInfoForm;
