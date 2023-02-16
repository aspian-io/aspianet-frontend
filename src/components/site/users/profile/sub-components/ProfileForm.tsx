import { Field, Form, Formik } from 'formik';
import React, { FC, useState, useMemo } from 'react';
import { UserProfileFormValues } from '../../../../../models/users/profile';
import * as Yup from 'yup';
import { GenderEnum } from '../../../../../models/auth/common';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import { mutate } from 'swr';
import { UserAgent } from '../../../../../lib/axios/agent';
import { useSession } from 'next-auth/react';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import { UserKeys } from '../../../../../lib/swr/keys';

interface IProps {
  initialFormValues: UserProfileFormValues;
}

const ProfileForm: FC<IProps> = ({ initialFormValues }) => {
  const { data: session } = useSession();
  const bioCharCount = initialFormValues.bio?.length ?? 0;
  const initialCharLeft = 400 - bioCharCount;
  const [charLeft, setCharLeft] = useState(initialCharLeft);

  // Formik Params Initialization
  const initialValues = new UserProfileFormValues(initialFormValues);
  const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
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
    website: Yup.string().nullable().url('Please enter a full standard URL'),
    facebook: Yup.string().nullable().url('Please enter a full standard URL'),
    twitter: Yup.string().nullable().url('Please enter a full standard URL'),
    instagram: Yup.string().nullable().url('Please enter a full standard URL'),
    linkedIn: Yup.string().nullable().url('Please enter a full standard URL'),
    pinterest: Yup.string().nullable().url('Please enter a full standard URL'),
    github: Yup.string().nullable().url('Please enter a full standard URL'),
    stackoverflow: Yup.string()
      .nullable()
      .url('Please enter a full standard URL'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const data = await UserAgent.updateProfile(values, session);
          await mutate(UserKeys.GET_CURRENT_USER_PROFILE);
          toast.success(
            'Your profile information has been updated successfully.',
            {
              className: 'bg-success text-light',
            }
          );
          const result = new UserProfileFormValues(data);
          resetForm({ values: result });
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
        values,
        handleChange,
        handleBlur,
        touched,
        errors,
        dirty,
        isValid,
      }) => (
        <Form className="w-full relative">
          <fieldset disabled={isSubmitting}>
            <div className="flex justify-between items-center w-full">
              <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3 w-">
                Personal Info
              </h3>
              <Button
                rounded="rounded-xl"
                size="h-10"
                type="submit"
                variant="success"
                disabled={!(isValid && dirty)}
                extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <LoadingSpinner className="w-6 h-6" />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
            <div className="py-6 w-full">
              <hr className="border-zinc-200" />
            </div>
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
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
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-3 sm:mt-4">
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
              <div className="flex flex-col mt-4 w-full">
                <label
                  className={`${
                    touched['bio'] && errors['bio'] ? 'text-danger' : ''
                  } self-start text-dark text-xs`}
                >
                  Biography:
                </label>
                <textarea
                  name="bio"
                  className={`border-0 rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm ${
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
              </div>
              <div className="flex justify-between items-center w-full mt-10">
                <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
                  Contact Info
                </h3>
              </div>
              <div className="py-6 w-full">
                <hr className="border-zinc-200" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
                <Field
                  type={InputTypeEnum.text}
                  name="country"
                  placeholder="Country"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="state"
                  placeholder="State"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="city"
                  placeholder="City"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="mt-4 w-full">
                <Field
                  type={InputTypeEnum.text}
                  name="address"
                  placeholder="Address"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full  space-y-3 sm:space-x-6 sm:space-y-0 mt-4">
                <Field
                  type={InputTypeEnum.text}
                  name="postalCode"
                  placeholder="Postal Code"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="phone"
                  placeholder="Phone"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="mobilePhone"
                  placeholder="Mobile Phone"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="flex justify-between items-center w-full mt-10">
                <h3 className="flex relative text-sm font-bold sm:text-lg text-dark ml-3 before:absolute before:w-6 before:h-6 sm:before:w-7 sm:before:h-7 before:bg-primary-light/30 before:rounded-lg before:-z-10 before:-top-1.5 sm:before:-top-1 before:-left-3">
                  Social Network Info
                </h3>
              </div>
              <div className="py-6 w-full">
                <hr className="border-zinc-200" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0">
                <Field
                  type={InputTypeEnum.text}
                  name="website"
                  placeholder="Website"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="facebook"
                  placeholder="Facebook"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="instagram"
                  placeholder="Instagram"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-4">
                <Field
                  type={InputTypeEnum.text}
                  name="twitter"
                  placeholder="Twitter"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="linkedIn"
                  placeholder="LinkedIn"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="pinterest"
                  placeholder="Pinterest"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center w-full space-y-3 sm:space-x-6 sm:space-y-0 mt-4">
                <Field
                  type={InputTypeEnum.text}
                  name="github"
                  placeholder="GitHub"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="stackoverflow"
                  placeholder="Stack Overflow"
                  className="w-full text-xs sm:text-sm h-10 rounded-xl"
                  component={FormikInput}
                />
              </div>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;
