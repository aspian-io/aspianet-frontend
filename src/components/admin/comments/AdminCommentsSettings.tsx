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

const AdminCommentsSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showForbiddenWords, setShowForbiddenWords] = useState(false);

  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.COMMENTS);
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
    COMMENT_IS_APPROVED:
      getSetting(SettingsKeyEnum.COMMENT_IS_APPROVED)?.value ?? undefined,
    COMMENT_FORBIDDEN_EXPRESSIONS:
      getSetting(SettingsKeyEnum.COMMENT_FORBIDDEN_EXPRESSIONS)?.value ??
      undefined,
    COMMENT_FORBIDDEN_SUSPEND:
      getSetting(SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND)?.value ?? undefined,
    COMMENT_MAX_LENGTH:
      getSetting(SettingsKeyEnum.COMMENT_MAX_LENGTH)?.value ?? undefined,
  };

  const validationSchema = Yup.object({
    COMMENT_FORBIDDEN_EXPRESSIONS: Yup.string(),
    COMMENT_MAX_LENGTH: Yup.number().min(
      10,
      'Minimum allowed value must be more than or equal to 10'
    ),
  });

  return (
    <AdminCard className="pb-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const settings = Object.entries(values).map(
            ([key, value]) =>
              new SettingsFormValues({
                key: key as SettingsKeyEnum,
                value: value,
                service: SettingsServiceEnum.COMMENTS,
              })
          );

          try {
            await AdminSettingsAgent.upsertSettings(session, settings);
            await mutate();
            resetForm();
            toast.success('Comments settings has been updated successfully.', {
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
          setFieldValue,
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
              <div className="flex justify-start items-start space-x-2">
                <input
                  id={SettingsKeyEnum.COMMENT_IS_APPROVED}
                  type={InputTypeEnum.checkbox}
                  name={SettingsKeyEnum.COMMENT_IS_APPROVED}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue(
                          SettingsKeyEnum.COMMENT_IS_APPROVED,
                          'true'
                        )
                      : setFieldValue(
                          SettingsKeyEnum.COMMENT_IS_APPROVED,
                          'false'
                        );
                  }}
                  defaultChecked={values.COMMENT_IS_APPROVED === 'true'}
                />
                <label
                  htmlFor={SettingsKeyEnum.COMMENT_IS_APPROVED}
                  className="text-zinc-700"
                >
                  All comments will be approved by default
                </label>
              </div>
              <div className="flex justify-start items-start space-x-2">
                <input
                  id={SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND}
                  type={InputTypeEnum.checkbox}
                  name={SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue(
                          SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND,
                          'true'
                        )
                      : setFieldValue(
                          SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND,
                          'false'
                        );
                  }}
                  defaultChecked={values.COMMENT_FORBIDDEN_SUSPEND === 'true'}
                />
                <label
                  htmlFor={SettingsKeyEnum.COMMENT_FORBIDDEN_SUSPEND}
                  className="text-zinc-700"
                >
                  All comments with forbidden words will be suspended
                </label>
              </div>
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.COMMENT_MAX_LENGTH}
                placeholder="Comments Max Length"
                className="h-9 rounded-xl w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Button
                rounded="rounded-xl"
                size="h-9"
                type="button"
                variant="primary-outline"
                extraCSSClasses="px-4"
                onClick={() => setShowForbiddenWords((prev) => !prev)}
              >
                {showForbiddenWords
                  ? 'Hide Forbidden Words'
                  : 'Show Forbidden Words'}
              </Button>
              <div
                className={`${
                  showForbiddenWords
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                } flex flex-col mt-4 transition-all duration-300`}
              >
                <label
                  className={`${
                    touched.COMMENT_FORBIDDEN_EXPRESSIONS &&
                    errors.COMMENT_FORBIDDEN_EXPRESSIONS
                      ? 'text-danger'
                      : ''
                  } self-start text-zinc-700 text-xs`}
                >
                  Comma Separated Forbidden Words:
                </label>
                <textarea
                  name={SettingsKeyEnum.COMMENT_FORBIDDEN_EXPRESSIONS}
                  className={`border-0 rounded-xl bg-zinc-100 w-72 h-20 placeholder-zinc-400 text-xs sm:text-sm ${
                    errors.COMMENT_FORBIDDEN_EXPRESSIONS &&
                    touched.COMMENT_FORBIDDEN_EXPRESSIONS
                      ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                      : ' focus:border-2 focus:border-primary focus:bg-light'
                  }`}
                  value={
                    values.COMMENT_FORBIDDEN_EXPRESSIONS?.length
                      ? values.COMMENT_FORBIDDEN_EXPRESSIONS
                      : ''
                  }
                  placeholder="Forbidden Words..."
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {touched.COMMENT_FORBIDDEN_EXPRESSIONS &&
                  errors.COMMENT_FORBIDDEN_EXPRESSIONS && (
                    <div className="mt-2 text-danger text-xs">
                      {errors.COMMENT_FORBIDDEN_EXPRESSIONS}
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

export default AdminCommentsSettings;
