import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
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

const AdminNewsletterSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.NEWSLETTER);
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
