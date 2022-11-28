import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC, useId } from 'react';
import { toast } from 'react-toastify';
import { AdminTaxonomyAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { INestError } from '../../../../../models/common/error';
import {
  ITaxonomyEntity,
  TaxonomyCreateFormValues,
  TaxonomyTypeEnum,
} from '../../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import { categoryValidationSchema } from './validation-schema';

interface IProps {
  addCategoryModalShow: boolean;
  newCategoryParentId?: string;
  parent?: ITaxonomyEntity;
  onClose: Function;
  onSuccess: Function;
}

const AddCategoryForm: FC<IProps> = ({
  addCategoryModalShow,
  parent,
  onClose,
  newCategoryParentId,
  onSuccess,
}) => {
  const cancelBtnId = useId();
  const { data: session } = useSession();
  const allowedUrlsToUse =
    process.env.NEXT_PUBLIC_ALLOWED_URL_TO_USE!.split(',');

  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_CREATE]}
      redirect={false}
    >
      <Modal
        show={addCategoryModalShow}
        onClose={() => {
          onClose();
          document.getElementById(cancelBtnId)?.click();
        }}
      >
        <Formik
          initialValues={new TaxonomyCreateFormValues()}
          enableReinitialize
          validationSchema={categoryValidationSchema}
          onSubmit={async (category, { resetForm }) => {
            try {
              await AdminTaxonomyAgent.create(session, {
                ...category,
                type: TaxonomyTypeEnum.CATEGORY,
                parentId: newCategoryParentId,
              });

              toast.success(`${category.term} category has been added`, {
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
            resetForm,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              {newCategoryParentId && (
                <div className="flex justify-center items-center text-xs text-light bg-primary rounded-lg px-4 py-1 mb-2 max-w-fit">
                  Parent: {parent?.term}
                </div>
              )}

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
                <Field
                  type={InputTypeEnum.text}
                  name="href"
                  placeholder="Link"
                  className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.number}
                  min={0}
                  name="order"
                  placeholder="Order"
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
                <Field
                  type={InputTypeEnum.text}
                  name="featuredImage"
                  placeholder="Featured Image Link"
                  className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
                <div className="text-xs text-zinc-400 text-left">
                  <div>
                    URLs with the following domains are allowed to use:
                  </div>
                  {allowedUrlsToUse.map((url, i) => (
                    <div key={i}>- {url}</div>
                  ))}
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

export default AddCategoryForm;
