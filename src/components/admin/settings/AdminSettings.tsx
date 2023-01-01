import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { AdminPostAgent, AdminSettingsAgent } from '../../../lib/axios/agent';
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
import ConfirmModal from '../../common/ConfirmModal';

const AdminSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [removeLoading, setRemoveLoading] = useState(false);
  const [
    removeContactAutoResponseTemplateConfirm,
    setRemoveContactAutoResponseTemplateConfirm,
  ] = useState(false);

  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.GENERAL);
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

  const siteContactResponseTemplateId = getSetting(
    SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID
  );

  const initialValues = {
    SITE_NAME: getSetting(SettingsKeyEnum.SITE_NAME)?.value ?? undefined,
    SITE_DESCRIPTION:
      getSetting(SettingsKeyEnum.SITE_DESCRIPTION)?.value ?? undefined,
    SITE_URL: getSetting(SettingsKeyEnum.SITE_URL)?.value ?? undefined,
    SITE_ADMIN_EMAIL:
      getSetting(SettingsKeyEnum.SITE_ADMIN_EMAIL)?.value ?? undefined,
    SITE_CONTACT_EMAIL:
      getSetting(SettingsKeyEnum.SITE_CONTACT_EMAIL)?.value ?? undefined,
    SITE_SUPPORT_EMAIL:
      getSetting(SettingsKeyEnum.SITE_SUPPORT_EMAIL)?.value ?? undefined,
    SITE_EXTRA_EMAILS:
      getSetting(SettingsKeyEnum.SITE_EXTRA_EMAILS)?.value ?? undefined,
    SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT:
      getSetting(SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT)
        ?.value ?? undefined,
  };

  const validationSchema = Yup.object({
    SITE_NAME: Yup.string().max(
      150,
      'Site name cannot be more than 150 characters'
    ),
    SITE_DESCRIPTION: Yup.string().max(
      250,
      'Site description cannot be more than 250 characters'
    ),
    SITE_URL: Yup.string()
      .url('Please enter full URL (e.g. https://www.example.com)')
      .required('The site URL is required'),
    SITE_ADMIN_EMAIL: Yup.string()
      .email('Please enter a standard email address')
      .required('Admin email is required'),
    SITE_CONTACT_EMAIL: Yup.string()
      .email('Please enter a standard email address')
      .required('Contact email is required'),
    SITE_SUPPORT_EMAIL: Yup.string()
      .email('Please enter a standard email address')
      .required('Support email is required'),
    SITE_EXTRA_EMAILS: Yup.string(),
    SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT: Yup.string().max(
      150,
      'Site contact auto response subject cannot be more than 150 characters'
    ),
  });

  return (
    <>
      <ConfirmModal
        onCancel={() => setRemoveContactAutoResponseTemplateConfirm(false)}
        onConfirm={async () => {
          try {
            setRemoveLoading(true);
            await AdminPostAgent.deletePermanently(
              session,
              siteContactResponseTemplateId!.value!
            );
            await AdminSettingsAgent.deleteSetting(
              session,
              SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID
            );
            await mutate();
            setRemoveLoading(false);
            setRemoveContactAutoResponseTemplateConfirm(false);
            toast.success(
              'Custom contact auto response template deleted successfully.',
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
        show={removeContactAutoResponseTemplateConfirm}
        onConfirmLoading={removeLoading}
        text="Are you sure you want to delete the custom contact auto response template?"
      />
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
                  service: SettingsServiceEnum.GENERAL,
                })
            );

            try {
              await AdminSettingsAgent.upsertSettings(session, settings);
              await mutate();
              resetForm();
              toast.success('Admin settings has been updated successfully.', {
                className: 'bg-success text-light',
              });
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
                  name={SettingsKeyEnum.SITE_NAME}
                  placeholder="Site Name"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.SITE_DESCRIPTION}
                  placeholder="Site Description"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.SITE_URL}
                  placeholder="Site URL"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.SITE_ADMIN_EMAIL}
                  placeholder="Site Admin Email"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.SITE_CONTACT_EMAIL}
                  placeholder="Site Contact Email"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name={SettingsKeyEnum.SITE_SUPPORT_EMAIL}
                  placeholder="Site Support Email"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <div className="flex flex-col mt-4">
                  <label
                    className={`${
                      touched.SITE_EXTRA_EMAILS && errors.SITE_EXTRA_EMAILS
                        ? 'text-danger'
                        : ''
                    } self-start text-zinc-700 text-xs`}
                  >
                    Comma Separated Extra Emails:
                  </label>
                  <textarea
                    name={SettingsKeyEnum.SITE_EXTRA_EMAILS}
                    className={`border-0 rounded-xl bg-zinc-100 w-72 h-20 md:h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                      errors.SITE_EXTRA_EMAILS && touched.SITE_EXTRA_EMAILS
                        ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                        : ' focus:border-2 focus:border-primary focus:bg-light'
                    }`}
                    value={
                      values.SITE_EXTRA_EMAILS?.length
                        ? values.SITE_EXTRA_EMAILS
                        : ''
                    }
                    placeholder="Comma Separated Extra Emails..."
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  {touched.SITE_EXTRA_EMAILS && errors.SITE_EXTRA_EMAILS && (
                    <div className="mt-2 text-danger text-xs">
                      {errors.SITE_EXTRA_EMAILS}
                    </div>
                  )}
                </div>
                <Field
                  type={InputTypeEnum.text}
                  name={
                    SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_EMAIL_SUBJECT
                  }
                  placeholder="Site Contact Auto Response Subject"
                  className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                  labelClassName="text-zinc-700"
                  component={FormikInput}
                />
                <div className="flex justify-start items-start space-x-2">
                  <span className="text-zinc-700">
                    Contact Auto Response Template:
                  </span>
                  {siteContactResponseTemplateId?.value &&
                  siteContactResponseTemplateId.value.length > 0 ? (
                    <>
                      <Link
                        href={`/admin/settings/contact-auto-response-template/edit/${siteContactResponseTemplateId.value}`}
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
                          setRemoveContactAutoResponseTemplateConfirm(true)
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
                      href={`/admin/settings/contact-auto-response-template/add`}
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
              </fieldset>
            </Form>
          )}
        </Formik>
      </AdminCard>
    </>
  );
};

export default AdminSettings;
