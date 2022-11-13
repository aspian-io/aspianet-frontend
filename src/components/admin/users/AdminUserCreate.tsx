import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { imgPlaceholderDataURL } from '../../../lib/helpers/img-placeholder';
import { CreateUser, ICreateUser } from '../../../models/users/admin/user';
import Button from '../../common/Button';
import FormikInput from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';
import * as Yup from 'yup';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { AxiosError } from 'axios';
import { INestError } from '../../../models/common/error';
import { toast } from 'react-toastify';
import Link from 'next/link';
import AdminCard from '../common/AdminCard';

const AdminUserCreate = () => {
  const router = useRouter();
  const initialValues: ICreateUser = new CreateUser();
  const [done, setDone] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(30, 'First name should be less than 30 characters')
          .required('Please enter your first name'),
        lastName: Yup.string()
          .max(30, 'Last name should be less than 30 characters')
          .required('Please enter your last name'),
        email: Yup.string()
          .max(50, 'Email address should be less than 50 characters')
          .email('Invalid email address')
          .required('Please enter your email address'),
        password: Yup.string()
          .required('Please enter your password')
          .min(6, 'Password must be more than 6 characters')
          .max(50, 'Password address should be less than 50 characters')
          .matches(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            'Password must have lowercase characters, uppercase characters, numbers or symbols'
          ),
      })}
      onSubmit={async (userInfo) => {
        try {
          const user = await AdminUserAgent.createUser(userInfo);
          setDone(true);
          toast.success('User created successfully.', {
            className: 'bg-success text-light',
          });
          router.push(`/admin/users/details/${user.id}`);
        } catch (error) {
          const err = error as AxiosError<INestError>;
          toast.error(err.response?.data.message, {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center items-center w-full">
          <AdminCard>
            <fieldset
              disabled={isSubmitting || done}
              className="w-full max-w-4xl my-2"
            >
              <div className="flex flex-col sm:flex-row  bg-light rounded-2xl">
                <div className="hidden sm:flex justify-center flex-col items-center sm:w-56 rounded-l-2xl overflow-hidden relative">
                  <Image
                    src="/login-aside.jpg"
                    fill
                    placeholder="blur"
                    blurDataURL={imgPlaceholderDataURL}
                    priority
                    alt="Site Logo"
                  />
                  <div className="h-full w-full bg-primary/60 z-10"></div>
                </div>

                <div className="flex justify-center flex-col items-center z-0 pt-8 sm:pt-10 pb-4 sm:pb-6 pl-8 sm:w-3/4">
                  <div className="flex flex-col sm:flex-row w-full mt-6">
                    <div className="flex flex-col justify-center items-center w-full sm:w-1/2 sm:pr-4">
                      <Field
                        name="firstName"
                        placeholder="First Name"
                        aria-required="true"
                        type="text"
                        component={FormikInput}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full sm:w-1/2 mt-6 sm:mt-0">
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        aria-required="true"
                        type="text"
                        component={FormikInput}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center w-full mt-6">
                    <Field
                      name="email"
                      placeholder="Email Address"
                      aria-required="true"
                      type="text"
                      component={FormikInput}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center w-full mt-4 sm:mt-6">
                    <Field
                      name="password"
                      placeholder="Password"
                      aria-required="true"
                      type="password"
                      component={FormikInput}
                    />
                  </div>
                  <div className="flex justify-center items-center w-full my-10">
                    <Button
                      rounded="rounded-xl"
                      size="h-11"
                      variant="primary"
                      type="submit"
                      block={true}
                      extraCSSClasses="flex justify-center items-center text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="w-6 h-6" />
                      ) : (
                        'Create User'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </fieldset>
          </AdminCard>
        </Form>
      )}
    </Formik>
  );
};

export default AdminUserCreate;
