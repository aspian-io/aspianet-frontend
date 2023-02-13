import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC, useId } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import {
  AdminPostAgent,
  AdminSettingsAgent,
  AdminTaxonomyAgent,
} from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { INestError } from '../../../../../models/common/error';
import {
  SettingsFormValues,
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../../../models/settings/settings';
import {
  TaxonomyCreateFormValues,
  TaxonomyTypeEnum,
} from '../../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import { swrMenuSettingsKey } from '../constants';
import { menuValidationSchema } from './menu-validation-schema';

interface IProps {
  addMenuModalShow: boolean;
  onClose: Function;
  onSuccess: Function;
}

const AddMenuForm: FC<IProps> = ({ addMenuModalShow, onClose, onSuccess }) => {
  const cancelBtnId = useId();
  const { data: session } = useSession();

  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE]}
      redirect={false}
    >
      <Modal
        show={addMenuModalShow}
        onClose={() => {
          onClose();
          document.getElementById(cancelBtnId)?.click();
        }}
      >
        <Formik
          initialValues={{
            ...new TaxonomyCreateFormValues(),
            MENU_PRIMARY: false,
            MENU_SECONDARY: false,
          }}
          enableReinitialize
          validationSchema={menuValidationSchema}
          onSubmit={async (menu, { resetForm }) => {
            try {
              const taxonomy = await AdminTaxonomyAgent.create(session, {
                ...menu,
                type: TaxonomyTypeEnum.MENU,
              });

              const settingsValues: SettingsFormValues[] = [];

              if (menu.MENU_PRIMARY) {
                const primaryMenuSetting = new SettingsFormValues({
                  key: SettingsKeyEnum.MENU_PRIMARY,
                  value: taxonomy.id,
                  service: SettingsServiceEnum.MENU,
                });

                settingsValues.push(primaryMenuSetting);
              }

              if (menu.MENU_SECONDARY) {
                const secondaryMenuSetting = new SettingsFormValues({
                  key: SettingsKeyEnum.MENU_SECONDARY,
                  value: taxonomy.id,
                  service: SettingsServiceEnum.MENU,
                });

                settingsValues.push(secondaryMenuSetting);
              }

              if (settingsValues.length > 0) {
                await AdminSettingsAgent.upsertSettings(
                  session,
                  settingsValues
                );
              }

              if (settingsValues.length > 0) {
                // Revalidate Home Page
                await AdminPostAgent.revalidateHomePage(session);
              }

              await mutate(swrMenuSettingsKey);

              toast.success(`${menu.term} menu has been added`, {
                className: 'bg-success text-light',
              });

              await onSuccess();
              resetForm();
            } catch (error) {
              const err = error as AxiosError<INestError>;
              toast.error(err.response?.data.message, {
                className: 'bg-danger text-light',
              });
            }
          }}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
            touched,
            errors,
            isValid,
            dirty,
            resetForm,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <fieldset className="space-y-2">
                <Field
                  type={InputTypeEnum.text}
                  name="term"
                  placeholder="Name"
                  className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="slug"
                  placeholder="Slug"
                  className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
                <div className="flex justify-start items-center space-x-2 mb-6">
                  <input
                    id={SettingsKeyEnum.MENU_PRIMARY}
                    type={InputTypeEnum.checkbox}
                    name={SettingsKeyEnum.MENU_PRIMARY}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                    onChange={(e) => {
                      e.target.checked
                        ? setFieldValue('MENU_PRIMARY', true)
                        : setFieldValue('MENU_PRIMARY', false);
                    }}
                    defaultChecked={values.MENU_PRIMARY}
                  />
                  <label
                    htmlFor={SettingsKeyEnum.MENU_PRIMARY}
                    className="text-zinc-700 text-sm"
                  >
                    Set as primary menu
                  </label>
                </div>
                <div className="flex justify-start items-center space-x-2 mb-6">
                  <input
                    id={SettingsKeyEnum.MENU_SECONDARY}
                    type={InputTypeEnum.checkbox}
                    name={SettingsKeyEnum.MENU_SECONDARY}
                    className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                    onChange={(e) => {
                      e.target.checked
                        ? setFieldValue('MENU_SECONDARY', true)
                        : setFieldValue('MENU_SECONDARY', false);
                    }}
                    defaultChecked={values.MENU_SECONDARY}
                  />
                  <label
                    htmlFor={SettingsKeyEnum.MENU_SECONDARY}
                    className="text-zinc-700 text-sm"
                  >
                    Set as secondary menu
                  </label>
                </div>
                <div className="flex flex-col mt-4 w-full">
                  <label
                    className={`${
                      touched.description && errors.description
                        ? 'text-danger'
                        : ''
                    } self-start text-dark text-xs`}
                  >
                    Description:
                  </label>
                  <textarea
                    name="description"
                    className={`border-0 rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                      errors.description && touched.description
                        ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                        : ' focus:border-2 focus:border-primary focus:bg-light'
                    }`}
                    value={values.description}
                    maxLength={400}
                    placeholder="Description..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </fieldset>
              <div className="flex justify-center items-center w-full mt-8">
                <Button
                  id={cancelBtnId}
                  rounded="rounded-xl"
                  size="h-9"
                  type="button"
                  variant="primary-outline"
                  extraCSSClasses="flex justify-center items-center w-24 sm:w-28"
                  onClick={() => {
                    onClose();
                    resetForm();
                  }}
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
            </Form>
          )}
        </Formik>
      </Modal>
    </AuthGuard>
  );
};

export default AddMenuForm;
