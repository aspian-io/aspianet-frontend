import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminPostAgent, AdminSettingsAgent } from '../../../lib/axios/agent';
import { AdminSettingsKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import {
  ISettingsEntity,
  ISettingsFormValues,
  SettingsFormValues,
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../models/settings/settings';
import Button from '../../common/Button';
import ConfirmModal from '../../common/ConfirmModal';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import Loading from '../../common/Loading';
import LoadingSpinner from '../../common/LoadingSpinner';
import AdminCard from '../common/AdminCard';

const AdminUsersSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [
    removeVerificationEmailTemplateConfirm,
    setRemoveVerificationEmailTemplateConfirm,
  ] = useState(false);
  const [
    removeResetPasswordTemplateConfirm,
    setRemoveResetPasswordTemplateConfirm,
  ] = useState(false);
  const [
    removeChangePasswordTemplateConfirm,
    setRemoveChangePasswordTemplateConfirm,
  ] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.USERS);
  const {
    data: settingsData,
    error,
    mutate,
  } = useSWR<ISettingsEntity[], AxiosError<INestError>>(
    AdminSettingsKeys.GET_ALL_SETTINGS,
    fetcher
  );

  if (error) router.push('/500');
  if (!settingsData) return <Loading />;

  const userLoginByEmailSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_LOGIN_BY_EMAIL
  )[0];
  const userLoginByPhoneSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_LOGIN_BY_MOBILE_PHONE
  )[0];
  const userAvatarEnableSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_AVATARS_ENABLE
  )[0];
  const userEmailVerificationTemplateIdSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID
  )[0];
  const userEmailVerificationSubjectSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_VERIFICATION_SUBJECT
  )[0];
  const userEmailTokenExpInMinsSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_TOKEN_EXP_IN_MINS
  )[0];
  const userEmailResetPassTemplateIdSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID
  )[0];
  const userEmailResetPassSubjectSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_SUBJECT
  )[0];
  const userEmailChangePassTemplateIdSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID
  )[0];
  const userEmailChangePassSubjectSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_EMAIL_CHANGE_PASSWORD_SUBJECT
  )[0];
  const userMobileVerificationPatternCodeSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_MOBILE_VERIFICATION_SMS_PATTERN_CODE
  )[0];
  const userMobileTokenExpInMinsSetting = settingsData.filter(
    (s) => s.key === SettingsKeyEnum.USERS_MOBILE_TOKEN_EXP_IN_MINS
  )[0];

  const initialValues = {
    USERS_LOGIN_BY_EMAIL: userLoginByEmailSetting?.value ?? undefined,
    USERS_LOGIN_BY_MOBILE_PHONE: userLoginByPhoneSetting?.value ?? undefined,
    USERS_AVATARS_ENABLE: userAvatarEnableSetting?.value ?? undefined,
    USERS_EMAIL_VERIFICATION_SUBJECT:
      userEmailVerificationSubjectSetting?.value ?? undefined,
    USERS_EMAIL_TOKEN_EXP_IN_MINS:
      userEmailTokenExpInMinsSetting?.value ?? undefined,
    USERS_EMAIL_RESET_PASSWORD_SUBJECT:
      userEmailResetPassSubjectSetting?.value ?? undefined,
    USERS_EMAIL_CHANGE_PASSWORD_SUBJECT:
      userEmailChangePassSubjectSetting?.value ?? undefined,
    USERS_MOBILE_VERIFICATION_SMS_PATTERN_CODE:
      userMobileVerificationPatternCodeSetting?.value ?? undefined,
    USERS_MOBILE_TOKEN_EXP_IN_MINS:
      userMobileTokenExpInMinsSetting?.value ?? undefined,
  };

  return (
    <>
      <ConfirmModal
        onCancel={() => setRemoveVerificationEmailTemplateConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminPostAgent.deletePermanently(
              session,
              userEmailVerificationTemplateIdSetting.value!
            );
            await AdminSettingsAgent.deleteSetting(
              session,
              SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID
            );
            await mutate();
            setRemoveLoading(false);
            setRemoveVerificationEmailTemplateConfirm(false);
            toast.success(
              'Custom verification email template deleted successfully.',
              {
                className: 'bg-success text-light',
              }
            );
          } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
          }
        }}
        show={removeVerificationEmailTemplateConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete the custom verification email template?"
      />
      <ConfirmModal
        onCancel={() => setRemoveResetPasswordTemplateConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminPostAgent.deletePermanently(
              session,
              userEmailResetPassTemplateIdSetting.value!
            );
            await AdminSettingsAgent.deleteSetting(
              session,
              SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID
            );
            await mutate();
            setRemoveLoading(false);
            setRemoveResetPasswordTemplateConfirm(false);
            toast.success(
              'Custom reset password email template deleted successfully.',
              {
                className: 'bg-success text-light',
              }
            );
          } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
          }
        }}
        show={removeResetPasswordTemplateConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete the custom reset password email template?"
      />
      <ConfirmModal
        onCancel={() => setRemoveChangePasswordTemplateConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminPostAgent.deletePermanently(
              session,
              userEmailChangePassTemplateIdSetting.value!
            );
            await AdminSettingsAgent.deleteSetting(
              session,
              SettingsKeyEnum.USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID
            );
            await mutate();
            setRemoveLoading(false);
            setRemoveChangePasswordTemplateConfirm(false);
            toast.success(
              'Custom change password email template deleted successfully.',
              {
                className: 'bg-success text-light',
              }
            );
          } catch (error) {
            toast.error('Something went wrong. Please try again later.', {
              className: 'bg-danger text-light text-sm',
            });
          }
        }}
        show={removeChangePasswordTemplateConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete the custom change password email template?"
      />
      <AdminCard className="pb-8">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            const settings = Object.entries(values).map(([key, value]) => {
              return new SettingsFormValues({
                key: key as SettingsKeyEnum,
                value: value ?? '',
                service: SettingsServiceEnum.USERS,
              });
            });

            try {
              await AdminSettingsAgent.upsertSettings(session, settings);
              await mutate();
              resetForm();
              toast.success(
                'Security information has been updated successfully.',
                {
                  className: 'bg-success text-light',
                }
              );
            } catch (error) {
              toast.error('Something went wrong.', {
                className: 'bg-danger text-light',
              });
            }
          }}
        >
          {({
            isSubmitting,
            isValid,
            dirty,
            values,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <fieldset
                disabled={isSubmitting}
                className="space-y-4 text-xs sm:text-sm"
              >
                <div className="flex flex-row justify-start items-start mb-10 mt-2">
                  <Button
                    rounded="rounded-xl"
                    size="h-9"
                    type="submit"
                    variant="success"
                    extraCSSClasses="w-28 sm:w-36 ml-auto"
                    disabled={!(isValid && dirty)}
                  >
                    {isSubmitting ? (
                      <div className="flex justify-center items-center">
                        <LoadingSpinner className="h-6 w-6 text-light" />
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
                <div className="flex justify-start items-start space-x-2">
                  <Field
                    id={SettingsKeyEnum.USERS_LOGIN_BY_EMAIL}
                    type={InputTypeEnum.checkbox}
                    name={SettingsKeyEnum.USERS_LOGIN_BY_EMAIL}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                    checked={values.USERS_LOGIN_BY_EMAIL === 'true'}
                  />
                  <label
                    htmlFor={SettingsKeyEnum.USERS_LOGIN_BY_EMAIL}
                    className="text-zinc-700"
                  >
                    Users ability to login with their email address.
                  </label>
                </div>
                <div className="flex justify-start items-start space-x-2">
                  <Field
                    id={SettingsKeyEnum.USERS_LOGIN_BY_MOBILE_PHONE}
                    type={InputTypeEnum.checkbox}
                    name={SettingsKeyEnum.USERS_LOGIN_BY_MOBILE_PHONE}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                    checked={values.USERS_LOGIN_BY_MOBILE_PHONE === 'true'}
                  />
                  <label
                    htmlFor={SettingsKeyEnum.USERS_LOGIN_BY_MOBILE_PHONE}
                    className="text-zinc-700"
                  >
                    Users ability to login with their mobile phone number (only
                    if supported).
                  </label>
                </div>
                <div className="flex justify-start items-start space-x-2">
                  <Field
                    id={SettingsKeyEnum.USERS_AVATARS_ENABLE}
                    type={InputTypeEnum.checkbox}
                    name="USERS_AVATARS_ENABLE"
                    value={values.USERS_AVATARS_ENABLE === 'true'}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor={SettingsKeyEnum.USERS_AVATARS_ENABLE}
                    className="text-zinc-700"
                  >
                    Users can change their avatar.
                  </label>
                </div>
                <div className="flex justify-start items-start space-x-2">
                  <span className="text-zinc-700">
                    Verification Email Custom Template:
                  </span>

                  {userEmailVerificationTemplateIdSetting?.value &&
                  userEmailVerificationTemplateIdSetting.value.length > 0 ? (
                    <>
                      <Link
                        href={`/admin/users/settings/verification-email-template/edit/${userEmailVerificationTemplateIdSetting.value}`}
                        className="flex justify-center items-center text-xs text-light bg-primary pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>

                        <span className="ml-1">Edit</span>
                      </Link>
                      <Button
                        rounded="rounded-md"
                        size="h-5"
                        type="button"
                        variant="danger"
                        extraCSSClasses="px-2"
                        onClick={() =>
                          setRemoveVerificationEmailTemplateConfirm(true)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </>
                  ) : (
                    <Link
                      href={`/admin/users/settings/verification-email-template/add`}
                      className="flex justify-center items-center text-xs text-light bg-primary hoverable:hover:bg-primary-dark pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>

                      <span>Add</span>
                    </Link>
                  )}
                </div>
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.USERS_EMAIL_VERIFICATION_SUBJECT}
                  placeholder="Verification Email Subject"
                  className="h-9 rounded-lg w-60 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.number}
                  min={0}
                  name={SettingsKeyEnum.USERS_EMAIL_TOKEN_EXP_IN_MINS}
                  placeholder="Email Validation Token Expiration (minutes)"
                  className="h-9 rounded-lg w-28 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <div className="flex justify-start items-start space-x-2">
                  <span className="text-zinc-700">
                    Reset Password Custom Template:
                  </span>
                  {userEmailResetPassTemplateIdSetting?.value &&
                  userEmailResetPassTemplateIdSetting.value.length > 0 ? (
                    <>
                      <Link
                        href={`/admin/users/settings/reset-password-template/edit/${userEmailResetPassTemplateIdSetting.value}`}
                        className="flex justify-center items-center text-xs text-light bg-primary pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>

                        <span className="ml-1">Edit</span>
                      </Link>
                      <Button
                        rounded="rounded-md"
                        size="h-5"
                        type="button"
                        variant="danger"
                        extraCSSClasses="px-2"
                        onClick={() =>
                          setRemoveResetPasswordTemplateConfirm(true)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </>
                  ) : (
                    <Link
                      href={`/admin/users/settings/reset-password-template/add`}
                      className="flex justify-center items-center text-xs text-light bg-primary hoverable:hover:bg-primary-dark pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>

                      <span>Add</span>
                    </Link>
                  )}
                </div>
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_SUBJECT}
                  placeholder="Reset Password Subject"
                  className="h-9 rounded-lg w-60 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <div className="flex justify-start items-start space-x-2">
                  <span className="text-zinc-700">
                    Change Password Custom Template:
                  </span>
                  {userEmailChangePassTemplateIdSetting?.value &&
                  userEmailChangePassTemplateIdSetting.value.length > 0 ? (
                    <>
                      <Link
                        href={`/admin/users/settings/change-password-template/edit/${userEmailChangePassTemplateIdSetting.value}`}
                        className="flex justify-center items-center text-xs text-light bg-primary pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                          <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>

                        <span className="ml-1">Edit</span>
                      </Link>
                      <Button
                        rounded="rounded-md"
                        size="h-5"
                        type="button"
                        variant="danger"
                        extraCSSClasses="px-2"
                        onClick={() =>
                          setRemoveChangePasswordTemplateConfirm(true)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </>
                  ) : (
                    <Link
                      href={`/admin/users/settings/change-password-template/add`}
                      className="flex justify-center items-center text-xs text-light bg-primary hoverable:hover:bg-primary-dark pl-1 pr-2.5 py-0.5 rounded-md font-normal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>

                      <span>Add</span>
                    </Link>
                  )}
                </div>
                <Field
                  type={InputTypeEnum.text}
                  name={
                    SettingsKeyEnum.USERS_MOBILE_VERIFICATION_SMS_PATTERN_CODE
                  }
                  placeholder="Mobile Phone Verification SMS Pattern Code (if supported)"
                  className="h-9 rounded-lg w-60 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.number}
                  min={0}
                  name={SettingsKeyEnum.USERS_MOBILE_TOKEN_EXP_IN_MINS}
                  placeholder="Mobile Phone Validation Token Expiration (minutes)"
                  className="h-9 rounded-lg w-28 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
              </fieldset>
            </Form>
          )}
        </Formik>
      </AdminCard>
    </>
  );
};

export default AdminUsersSettings;
