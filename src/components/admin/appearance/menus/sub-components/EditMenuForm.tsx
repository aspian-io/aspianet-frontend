import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC, useId } from 'react';
import { toast } from 'react-toastify';
import { AdminTaxonomyAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { INestError } from '../../../../../models/common/error';
import { TaxonomyEditFormValues } from '../../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import { menuValidationSchema } from './menu-validation-schema';

interface IProps {
  initialValues: TaxonomyEditFormValues;
  editMenuModalShow: boolean;
  menuIdToEdit: string;
  onClose: Function;
  onSuccess: Function;
}

const EditMenuForm: FC<IProps> = ({
  initialValues,
  editMenuModalShow,
  menuIdToEdit,
  onSuccess,
  onClose,
}) => {
  const { data: session } = useSession();
  const cancelBtnId = useId();

  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_EDIT]}
      redirect={false}
    >
      <Modal
        show={editMenuModalShow}
        onClose={() => {
          onClose();
          document.getElementById(cancelBtnId)?.click();
        }}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={menuValidationSchema}
          onSubmit={async (menu, { resetForm }) => {
            try {
              await AdminTaxonomyAgent.edit(session, menuIdToEdit!, menu);

              toast.success(`${menu.term} menu has been modified`, {
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
            isSubmitting,
            touched,
            errors,
            isValid,
            dirty,
            handleChange,
            handleBlur,
            resetForm,
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

export default EditMenuForm;
