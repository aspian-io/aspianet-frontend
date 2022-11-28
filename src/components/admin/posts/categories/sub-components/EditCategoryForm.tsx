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
  TaxonomyEditFormValues,
} from '../../../../../models/taxonomies/admin/taxonomy';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import { categoryValidationSchema } from './validation-schema';
import Image from 'next/image';
import { imgPlaceholderDataURL } from '../../../../../lib/helpers/img-placeholder';

interface IProps {
  initialValues: TaxonomyEditFormValues;
  editCategoryModalShow: boolean;
  categoryIdToEdit: string;
  categoryParentId?: string;
  parent?: ITaxonomyEntity;
  onClose: Function;
  onSuccess: Function;
}

const EditCategoryForm: FC<IProps> = ({
  initialValues,
  editCategoryModalShow,
  categoryIdToEdit,
  categoryParentId,
  parent,
  onSuccess,
  onClose,
}) => {
  const { data: session } = useSession();
  const cancelBtnId = useId();
  const allowedUrlsToUse =
    process.env.NEXT_PUBLIC_ALLOWED_URL_TO_USE!.split(',');

  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.TAXONOMY_EDIT]}
      redirect={false}
    >
      <Modal
        show={editCategoryModalShow}
        onClose={() => {
          onClose();
          document.getElementById(cancelBtnId)?.click();
        }}
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={categoryValidationSchema}
          onSubmit={async (category, { resetForm }) => {
            try {
              await AdminTaxonomyAgent.edit(
                session,
                categoryIdToEdit!,
                category
              );

              toast.success(`${category.term} category has been modified`, {
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
              {categoryParentId && (
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
                  <div>URLs with the following domains are allowed to use:</div>
                  {allowedUrlsToUse.map((url, i) => (
                    <div key={i}>- {url}</div>
                  ))}
                </div>
              </fieldset>
              {!errors.featuredImage &&
                values.featuredImage &&
                allowedUrlsToUse.some((url) =>
                  values.featuredImage?.includes(url)
                ) && (
                  <div className="flex justify-center items-center w-full mt-4">
                    <div className="relative h-32 w-32 rounded-xl overflow-hidden">
                      <Image
                        className="hoverable:hover:scale-110 hoverable:hover:rotate-2 transition-transform duration-700"
                        src={values.featuredImage}
                        fill
                        placeholder="blur"
                        blurDataURL={imgPlaceholderDataURL}
                        alt={'Category featured image'}
                        sizes="(max-width: 640px) 100vw,
                     (max-width: 1200px) 50vw,
                      33vw"
                      />
                    </div>
                  </div>
                )}
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

export default EditCategoryForm;
