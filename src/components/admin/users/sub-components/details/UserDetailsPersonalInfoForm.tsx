import { Field, Form, Formik } from 'formik';
import React, { FC, useState } from 'react';
import {
  AdminUserPersonalInfo,
  IUserEntity,
} from '../../../../../models/users/admin/user';
import * as Yup from 'yup';
import { GenderEnum } from '../../../../../models/auth/common';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import Button from '../../../../common/Button';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import { AdminUserAgent } from '../../../../../lib/axios/agent';
import { useSession } from 'next-auth/react';
import { mutate } from 'swr';
import { AdminUserKeys } from '../../../../../lib/swr/keys';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import { reloadSession } from '../../../../../lib/next-auth/session';

interface IProps {
  show: boolean;
  onCancel: Function;
  userData: IUserEntity;
  onSuccess: Function;
}

const UserDetailsPersonalInfoForm: FC<IProps> = ({
  show,
  onCancel,
  userData,
  onSuccess,
}) => {
  const { data: session } = useSession();
  const bioCharCount = userData.bio?.length ?? 0;
  const initialCharLeft = 400 - bioCharCount;
  const [charLeft, setCharLeft] = useState(initialCharLeft);
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(30, 'First name should be less than 30 characters')
      .required('Please enter your first name'),
    lastName: Yup.string()
      .max(30, 'Last name should be less than 30 characters')
      .required('Please enter your last name'),
    bio: Yup.string()
      .nullable()
      .min(5, 'Biography should be more than 5 characters')
      .max(400, 'Biography should be less than 400 characters'),
    birthDate: Yup.date().nullable(),
    gender: Yup.mixed().nullable().oneOf(Object.values(GenderEnum)),
  });

  return (
    <Modal show={show} onClose={() => onCancel()}>
      <Formik
        initialValues={new AdminUserPersonalInfo(userData)}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const user = await AdminUserAgent.updateUser(
              userData.id,
              values,
              session
            );
            await mutate(`${AdminUserKeys.GET_USER_DETAILS}/${userData.id}`);
            reloadSession();
            toast.success(
              'Your personal information has been updated successfully.',
              {
                className: 'bg-success text-light',
              }
            );
            const result = new AdminUserPersonalInfo(user);
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
                    name="firstName"
                    placeholder="First Name"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.text}
                    name="lastName"
                    placeholder="Last Name"
                    className="text-xs sm:text-sm h-10 rounded-xl"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
                <div className="flex flex-col w-full sm:w-1/2">
                  <label
                    className={`self-start ${
                      touched['gender'] && errors['gender'] ? 'text-danger' : ''
                    } text-dark text-xs`}
                  >
                    Gender:
                  </label>
                  <select
                    name="gender"
                    className={`text-xs sm:text-sm h-10 bg-zinc-100 border-0 rounded-xl ${
                      !!values.gender ? 'text-dark' : 'text-zinc-400'
                    } focus:text-dark focus:border-2 focus:border-primary focus:bg-light`}
                    value={values.gender ?? undefined}
                    onChange={handleChange}
                  >
                    <option value="default" disabled>
                      Gender
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <Field
                    type={InputTypeEnum.date}
                    name="birthDate"
                    placeholder="Birthday"
                    className="text-xs sm:text-sm h-10 rounded-xl w-full flex"
                    component={FormikInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <label
                  className={`${
                    touched['bio'] && errors['bio'] ? 'text-danger' : ''
                  } self-start text-dark text-xs`}
                >
                  Biography:
                </label>
                <textarea
                  name="bio"
                  className={`border-0 rounded-xl bg-zinc-100 w-full h-20 md:h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                    errors.bio && touched.bio
                      ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                      : ' focus:border-2 focus:border-primary focus:bg-light'
                  }`}
                  maxLength={400}
                  value={values.bio?.length ? values.bio : ''}
                  placeholder="Biography..."
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setCharLeft(400 - e.target.value.length);
                  }}
                ></textarea>
              </div>
              {charLeft > 1 && (
                <div className="mt-2 text-zinc-400 text-xs self-start">
                  {charLeft} characters left.
                </div>
              )}
              {charLeft === 1 && (
                <div className="mt-2 text-zinc-400 text-xs self-start">
                  {charLeft} character left.
                </div>
              )}
              {charLeft === 0 && (
                <div className="mt-2 text-zinc-400 text-xs self-start">
                  No characters left.
                </div>
              )}
              {touched.bio && errors.bio && (
                <div className="mt-2 text-danger text-xs">{errors.bio}</div>
              )}
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

export default UserDetailsPersonalInfoForm;
