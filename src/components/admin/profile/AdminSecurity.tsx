import { useSession } from 'next-auth/react';
import React from 'react';
import {
  ChangePasswordFormValues,
  IChangePassword,
} from '../../../models/users/security';
import AdminCard from '../common/AdminCard';
import TopBar from '../topbar/TopBar';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { UserAgent } from '../../../lib/axios/agent';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';

const AdminSecurity = () => {
  const { data: session } = useSession();
  // Formik Params Initialization
  const initialValues: IChangePassword = new ChangePasswordFormValues();
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      'Please enter your current password'
    ),
    password: Yup.string()
      .required('Please enter your new password')
      .min(6, 'Password must be more than 6 characters')
      .max(50, 'Password address should be less than 50 characters')
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must have lowercase characters, uppercase characters, numbers or symbols'
      ),
  });

  return (
    <div className="flex flex-col justify-center items-center pb-4 space-y-4">
      <TopBar title='Security' />
      <AdminCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (body, { resetForm }) => {
            if (body.currentPassword === body.password) {
              resetForm();
              return toast.error(
                'Your current and new password are identical. Please enter a different password and try again.',
                {
                  className: 'bg-danger text-light',
                }
              );
            }
            try {
              await UserAgent.changePassword(body, session);
              resetForm();
              toast.success('Your Password has been changed successfully.', {
                className: 'bg-success text-light',
              });
            } catch (error) {
              toast.error('Something went wrong, please try again later.', {
                className: 'bg-danger text-light',
              });
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="w-full">
              <fieldset disabled={isSubmitting}>
                <div className="flex justify-between items-center w-full">
                  <h4 className="font-bold text-primary text-base underline">
                    Change Password
                  </h4>
                  <Button
                    rounded="rounded-xl"
                    size="h-9"
                    type="submit"
                    variant="success"
                    disabled={!(isValid && dirty)}
                    extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner className="w-6 h-6" />
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
                <div className="py-6 w-full">
                  <hr className="border-zinc-200" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-start w-full space-y-3 sm:space-x-6 sm:space-y-0">
                    <div className="flex flex-col w-full sm:w-1/2">
                      <Field
                        type={InputTypeEnum.password}
                        name="currentPassword"
                        placeholder="Current Password"
                        className="text-xs sm:text-sm h-10 rounded-xl"
                        required
                        component={FormikInput}
                      />
                    </div>
                    <div className="flex flex-col w-full sm:w-1/2">
                      <Field
                        type={InputTypeEnum.password}
                        name="password"
                        placeholder="New Password"
                        className="text-xs sm:text-sm h-10 rounded-xl"
                        required
                        component={FormikInput}
                      />
                      <div className="mt-2 text-zinc-400 text-xs">
                        Password must contains uppercase letters, lowercase
                        letters, numbers or symbols.
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </Form>
          )}
        </Formik>
      </AdminCard>
    </div>
  );
};

export default AdminSecurity;
