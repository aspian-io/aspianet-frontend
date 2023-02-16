import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { AdminSettingsAgent } from '../../../lib/axios/agent';
import { AdminSettingsKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import {
  ISettingsEntity,
  SettingsFormValues,
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../models/settings/settings';
import Button from '../../common/Button';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import Loading from '../../common/Loading';
import LoadingSpinner from '../../common/LoadingSpinner';
import AdminCard from '../common/AdminCard';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Link from 'next/link';

const AdminNewsletterSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [
    removeVerificationEmailTemplateConfirm,
    setRemoveVerificationEmailTemplateConfirm,
  ] = useState(false);

  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.NEWSLETTER);
  const {
    data: settingsData,
    error,
    mutate,
  } = useSWR<ISettingsEntity[], AxiosError<INestError>>(
    `${AdminSettingsKeys.GET_ALL_SETTINGS}?settingService=${SettingsServiceEnum.NEWSLETTER}`,
    fetcher
  );

  if (error) router.push('/500');
  if (!settingsData) return <Loading />;

  function getSetting(key: SettingsKeyEnum) {
    return settingsData?.filter((s) => s.key === key)[0];
  }

  const initialValues = {
    NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS:
      getSetting(SettingsKeyEnum.NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS)
        ?.value ?? undefined,
    NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT:
      getSetting(SettingsKeyEnum.NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT)
        ?.value ?? undefined,
    NEWSLETTER_CAN_SPAM:
      getSetting(SettingsKeyEnum.NEWSLETTER_CAN_SPAM)?.value ?? undefined,
    NEWSLETTER_SENDING_FROM:
      getSetting(SettingsKeyEnum.NEWSLETTER_SENDING_FROM)?.value ?? undefined,
    NEWSLETTER_COMPANY:
      getSetting(SettingsKeyEnum.NEWSLETTER_COMPANY)?.value ?? undefined,
    NEWSLETTER_COPYRIGHT:
      getSetting(SettingsKeyEnum.NEWSLETTER_COPYRIGHT)?.value ?? undefined,
    NEWSLETTER_HOMEPAGE:
      getSetting(SettingsKeyEnum.NEWSLETTER_HOMEPAGE)?.value ?? undefined,
    NEWSLETTER_UNSUB_PAGE:
      getSetting(SettingsKeyEnum.NEWSLETTER_UNSUB_PAGE)?.value ?? undefined,
    NEWSLETTER_UNSUB_PAGE_LABEL:
      getSetting(SettingsKeyEnum.NEWSLETTER_UNSUB_PAGE_LABEL)?.value ??
      undefined,
    NEWSLETTER_ADDRESS:
      getSetting(SettingsKeyEnum.NEWSLETTER_ADDRESS)?.value ?? undefined,
    NEWSLETTER_SUBSCRIBE_TEMPLATE_ID:
      getSetting(SettingsKeyEnum.NEWSLETTER_SUBSCRIBE_TEMPLATE_ID)?.value ??
      undefined,
    NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID:
      getSetting(SettingsKeyEnum.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID)?.value ??
      undefined,
  };

  const validationSchema = Yup.object({
    NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS: Yup.number()
      .min(1, 'Minimum allowed value must be more than or equal to 1')
      .required('Newsletter token expiration time is required'),
    NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT: Yup.string().required(
      'Newsletter subject is required'
    ),
    NEWSLETTER_CAN_SPAM: Yup.string(),
    NEWSLETTER_SENDING_FROM: Yup.string()
      .email('Please enter a standard email')
      .required('Newsletter subject is required'),
    NEWSLETTER_COMPANY: Yup.string(),
    NEWSLETTER_COPYRIGHT: Yup.string(),
    NEWSLETTER_HOMEPAGE: Yup.string(),
    NEWSLETTER_UNSUB_PAGE: Yup.string().url('Please enter a standard full URL'),
    NEWSLETTER_UNSUB_PAGE_LABEL: Yup.string(),
    NEWSLETTER_ADDRESS: Yup.string(),
  });

  return (
    <AdminCard className="pb-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const settings = Object.entries(values).map(
            ([key, value]) =>
              new SettingsFormValues({
                key: key as SettingsKeyEnum,
                value: value,
                service: SettingsServiceEnum.NEWSLETTER,
              })
          );

          try {
            await AdminSettingsAgent.upsertSettings(session, settings);
            await mutate();
            resetForm();
            toast.success(
              'Newsletter settings has been updated successfully.',
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
          values,
          isSubmitting,
          isValid,
          dirty,
          touched,
          errors,
          handleBlur,
          handleChange,
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
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_SUBSCRIPTION_TOKEN_EXP_IN_MINS}
                placeholder="Subscription Token Expiration (Minutes)"
                className="h-9 rounded-xl w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <div className="flex justify-start items-start space-x-2">
                <span className="text-zinc-700">
                  Subscribe Verification Email Custom Template:
                </span>

                {initialValues.NEWSLETTER_SUBSCRIBE_TEMPLATE_ID &&
                initialValues.NEWSLETTER_SUBSCRIBE_TEMPLATE_ID.length > 0 ? (
                  <>
                    <Link
                      href={`/admin/newsletter/settings/subscribe-email-template/edit/${initialValues.NEWSLETTER_SUBSCRIBE_TEMPLATE_ID}`}
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
                    href={`/admin/newsletter/settings/subscribe-email-template/add`}
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
              <div className="flex justify-start items-start space-x-2">
                <span className="text-zinc-700">
                  Unsubscribe Verification Email Custom Template:
                </span>

                {initialValues.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID &&
                initialValues.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID.length > 0 ? (
                  <>
                    <Link
                      href={`/admin/newsletter/settings/unsubscribe-email-template/edit/${initialValues.NEWSLETTER_UNSUBSCRIBE_TEMPLATE_ID}`}
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
                    href={`/admin/newsletter/settings/unsubscribe-email-template/add`}
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
                name={SettingsKeyEnum.NEWSLETTER_SUBSCRIPTION_EMAIL_SUBJECT}
                placeholder="Newsletter Email Subject"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_SENDING_FROM}
                placeholder="Newsletter Sending From"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_COMPANY}
                placeholder="Company"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_COPYRIGHT}
                placeholder="Copyright"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_HOMEPAGE}
                placeholder="Home Page"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_UNSUB_PAGE}
                placeholder="Unsubscribe Page"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.NEWSLETTER_UNSUB_PAGE_LABEL}
                placeholder="Unsubscribe Page Label"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <div className="flex flex-col mt-4 transition-all duration-300">
                <label
                  className={`${
                    touched.NEWSLETTER_ADDRESS && errors.NEWSLETTER_ADDRESS
                      ? 'text-danger'
                      : ''
                  } self-start text-zinc-700 text-xs`}
                >
                  Address:
                </label>
                <textarea
                  name={SettingsKeyEnum.NEWSLETTER_ADDRESS}
                  className={`border-0 rounded-xl bg-zinc-100 w-72 h-20 placeholder-zinc-400 text-xs sm:text-sm ${
                    errors.NEWSLETTER_ADDRESS && touched.NEWSLETTER_ADDRESS
                      ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                      : ' focus:border-2 focus:border-primary focus:bg-light'
                  }`}
                  value={
                    values.NEWSLETTER_ADDRESS?.length
                      ? values.NEWSLETTER_ADDRESS
                      : ''
                  }
                  placeholder="Address..."
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {touched.NEWSLETTER_ADDRESS && errors.NEWSLETTER_ADDRESS && (
                  <div className="mt-2 text-danger text-xs">
                    {errors.NEWSLETTER_ADDRESS}
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-4 transition-all duration-300">
                <label
                  className={`${
                    touched.NEWSLETTER_CAN_SPAM && errors.NEWSLETTER_CAN_SPAM
                      ? 'text-danger'
                      : ''
                  } self-start text-zinc-700 text-xs`}
                >
                  Spam Prevention Disclaimer:
                </label>
                <textarea
                  name={SettingsKeyEnum.NEWSLETTER_CAN_SPAM}
                  className={`border-0 rounded-xl bg-zinc-100 w-72 h-36 placeholder-zinc-400 text-xs sm:text-sm ${
                    errors.NEWSLETTER_CAN_SPAM && touched.NEWSLETTER_CAN_SPAM
                      ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                      : ' focus:border-2 focus:border-primary focus:bg-light'
                  }`}
                  value={
                    values.NEWSLETTER_CAN_SPAM?.length
                      ? values.NEWSLETTER_CAN_SPAM
                      : ''
                  }
                  placeholder="Spam Prevention Disclaimer..."
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {touched.NEWSLETTER_CAN_SPAM && errors.NEWSLETTER_CAN_SPAM && (
                  <div className="mt-2 text-danger text-xs">
                    {errors.NEWSLETTER_CAN_SPAM}
                  </div>
                )}
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </AdminCard>
  );
};

export default AdminNewsletterSettings;
