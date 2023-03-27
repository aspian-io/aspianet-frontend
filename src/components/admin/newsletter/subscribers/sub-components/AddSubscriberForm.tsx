import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC, useId } from 'react';
import { toast } from 'react-toastify';
import { AdminNewsletterAgent } from '../../../../../lib/axios/agent';
import { ClaimsEnum } from '../../../../../models/auth/common';
import { INestError } from '../../../../../models/common/error';
import { AuthGuard } from '../../../../common/AuthGuard';
import Button from '../../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import Modal from '../../../../common/Modal';
import * as Yup from 'yup';
import { AdminSubscriberCreateFormValues } from '../../../../../models/newsletter/subscribers/admin/subscriber';

interface IProps {
  addSubscriberModalShow: boolean;
  onClose: Function;
  onSuccess: Function;
}

const AddSubscriberForm: FC<IProps> = ({
  addSubscriberModalShow,
  onClose,
  onSuccess,
}) => {
  const cancelBtnId = useId();
  const { data: session } = useSession();

  const subscriberValidationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Name must be less than 50 characters')
      .required('Please enter subscriber name'),
    email: Yup.string()
      .max(50, 'Email address must be less than 50 characters')
      .email('Invalid email address')
      .required('Please enter your email address'),
  });

  return (
    <AuthGuard
      claims={[ClaimsEnum.ADMIN, ClaimsEnum.NEWSLETTER_CREATE]}
      redirect={false}
    >
      <Modal
        show={addSubscriberModalShow}
        onClose={() => {
          onClose();
          document.getElementById(cancelBtnId)?.click();
        }}
      >
        <Formik
          initialValues={new AdminSubscriberCreateFormValues()}
          enableReinitialize
          validationSchema={subscriberValidationSchema}
          onSubmit={async (subscriber, { resetForm }) => {
            try {
              await AdminNewsletterAgent.createSubscriber(
                session,
                new AdminSubscriberCreateFormValues(subscriber)
              );

              toast.success(`Subscriber created successfully`, {
                className: 'bg-success text-light',
              });

              await onSuccess();
              resetForm();
            } catch (error) {
              resetForm();
              const err = error as AxiosError<INestError>;
              if (!err.response?.data.statusCode.toString().startsWith('5')) {
                toast.error(err.response?.data.message, {
                  className: 'bg-danger text-light text-sm',
                });
                return;
              }
              toast.error('Something went wrong', {
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
              <fieldset className="space-y-2">
                <Field
                  type={InputTypeEnum.text}
                  name="name"
                  placeholder="Name"
                  className="text-xs sm:text-sm h-9 sm:h-10 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="email"
                  placeholder="Email Address"
                  aria-required="true"
                  component={FormikInput}
                />
                <div className="flex justify-start items-center text-xs text-dark">
                  <div className="mr-2">Approval:</div>
                  <label
                    htmlFor="approved"
                    className="inline-flex relative items-center cursor-pointer ml-auto"
                  >
                    <input
                      type="checkbox"
                      name="approved"
                      id="approved"
                      value=""
                      className="sr-only peer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      checked={values.approved}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
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
                    'Subscribe'
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

export default AddSubscriberForm;
