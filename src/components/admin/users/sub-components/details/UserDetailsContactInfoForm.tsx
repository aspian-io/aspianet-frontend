import React, { FC } from 'react';
import {
  AdminUserDetailsContactInfo,
  IUserEntity,
} from '../../../../../models/users/admin/user';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';
import Modal from '../../../../common/Modal';
import { Field, Form, Formik } from 'formik';
import { AdminUserAgent } from '../../../../../lib/axios/agent';
import { mutate } from 'swr';
import { reloadSession } from '../../../../../lib/next-auth/session';
import { AdminUserKeys } from '../../../../../lib/swr/keys';
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

const UserDetailsContactInfoForm: FC<IProps> = ({
  show,
  onCancel,
  userData,
  onSuccess,
}) => {
  const { data: session } = useSession();
  const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

  const validationSchema = Yup.object({
    country: Yup.string()
      .nullable()
      .min(2, 'Country name should be more than 2 characters')
      .max(30, 'Country name should be less than 30 characters'),
    state: Yup.string()
      .nullable()
      .min(2, 'State name should be more than 2 characters')
      .max(30, 'State name should be less than 30 characters'),
    city: Yup.string()
      .nullable()
      .min(2, 'City name should be more than 2 characters')
      .max(30, 'City name should be less than 30 characters'),
    address: Yup.string()
      .nullable()
      .min(10, 'Address should be more than 10 characters')
      .max(100, 'Address should be less than 100 characters'),
    email: Yup.string()
      .max(50, 'Email address should be less than 50 characters')
      .email('Invalid email address')
      .required('Please enter your email address'),
    phone: Yup.string()
      .nullable()
      .matches(phoneRegex, 'Phone value must be a standard phone number'),
    mobilePhone: Yup.string()
      .nullable()
      .matches(phoneRegex, 'Phone value must be a standard phone number'),
    postalCode: Yup.string()
      .nullable()
      .min(5, 'Postal code should be more than 5 characters')
      .max(10, 'Postal code should be less than 10 characters'),
  });

  return (
    <Modal show={show} onClose={() => onCancel()}>
      <Formik
        initialValues={new AdminUserDetailsContactInfo(userData)}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const user = await AdminUserAgent.updateUser(
              userData.id,
              values,
              session
            );
            await mutate(`${AdminUserKeys.GET_USER_DETAILS}/${userData.id}`);
            if (session?.user.id === userData.id) reloadSession();
            toast.success(
              'Your contact information has been updated successfully.',
              {
                className: 'bg-success text-light',
              }
            );
            const result = new AdminUserDetailsContactInfo(user);
            resetForm({ values: result });
            onSuccess();
          } catch (error) {
            resetForm();
            const err = error as AxiosError<INestError>;
            if (err.response?.data.error === 'EMAIL_IN_USE') {
              return toast.error(
                'Email is already in use, please try another email address.',
                {
                  className: 'bg-danger text-light',
                }
              );
            }
            if (err.response?.data.error === 'MOBILE_IN_USE') {
              return toast.error(
                'Mobile phone is already in use, please try another mobile phone number.',
                {
                  className: 'bg-danger text-light',
                }
              );
            }
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
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <fieldset disabled={isSubmitting}>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="country"
                    placeholder="Country"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="state"
                    placeholder="State"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="city"
                    placeholder="City"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="postalCode"
                    placeholder="Postal Code"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="phone"
                    placeholder="Phone"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="mobilePhone"
                    placeholder="Mobile Phone"
                    className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <Field
                  type={InputTypeEnum.email}
                  name="email"
                  placeholder="Email"
                  className="w-full text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="mt-3 sm:mt-4">
                <Field
                  type={InputTypeEnum.text}
                  name="address"
                  placeholder="Address"
                  className="w-full text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
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

export default UserDetailsContactInfoForm;
