import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Button from '../../../common/Button';
import FormikInput, { InputTypeEnum } from '../../../common/FormikInput';

const ContactSection = () => {
  const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(60, 'Name must be less than 60 characters')
      .required('Please enter your name'),
    phone: Yup.string()
      .nullable()
      .matches(phoneRegex, 'Phone value must be a standard phone number'),
    from: Yup.string()
      .email('Please enter a standard email address')
      .required('Please enter your email address'),
    subject: Yup.string()
      .max(60, 'Subject must be less than 60 characters')
      .required('Please enter the subject'),
    html: Yup.string().required('Please enter the message content'),
  });

  return (
    <section className="container mx-auto flex flex-col justify-center items-center py-10 sm:py-20 px-4 transition-all duration-300">
      <div className="flex flex-col justify-center items-center space-y-6">
        <h3 className="text-primary text-sm">Contact</h3>
        <h3 className="flex relative font-bold text-2xl sm:text-3xl text-dark ml-3 before:absolute before:w-10 before:h-10 sm:before:w-12 sm:before:h-12 before:bg-primary-light/30 before:rounded-xl before:-z-10 before:-top-2 sm:before:-top-3 before:-left-5 sm:before:-left-6">
          <span className="text-dark">Get</span>
          <span className="text-primary">&nbsp;In Touch</span>
        </h3>
      </div>

      <Formik
        initialValues={{
          name: '',
          phone: '',
          from: '',
          subject: '',
          html: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({
          isSubmitting,
          touched,
          errors,
          values,
          handleBlur,
          handleChange,
        }) => (
          <Form className="flex flex-col justify-start items-start space-y-8 w-full mt-20">
            <div className="flex flex-col sm:flex-row justify-center items-start space-y-4 sm:space-y-0 sm:space-x-10 w-full">
              <div className="flex flex-col justify-center items-center w-full sm:w-1/2 space-y-4">
                <Field
                  type={InputTypeEnum.text}
                  name="name"
                  placeholder="Name"
                  className="text-xs sm:text-sm h-10 sm:h-12 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="phone"
                  placeholder="Phone"
                  className="text-xs sm:text-sm h-10 sm:h-12 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="from"
                  placeholder="Email Address"
                  className="text-xs sm:text-sm h-10 sm:h-12 rounded-xl"
                  component={FormikInput}
                />
                <Field
                  type={InputTypeEnum.text}
                  name="subject"
                  placeholder="Subject"
                  className="text-xs sm:text-sm h-10 sm:h-12 rounded-xl"
                  component={FormikInput}
                />
              </div>
              <div className="w-full sm:w-1/2">
                <div>
                  <label
                    className={`${
                      touched.html && errors.html ? 'text-danger' : ''
                    } self-start text-dark text-xs`}
                  >
                    Message:
                  </label>
                  <textarea
                    name="html"
                    className={`border-0 rounded-xl bg-zinc-100 w-full min-h-[17.8rem] placeholder-zinc-400 text-xs sm:text-sm ${
                      errors.html && touched.html
                        ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                        : ' focus:border-2 focus:border-primary focus:bg-light'
                    }`}
                    maxLength={400}
                    value={values.html ? values.html : ''}
                    placeholder="Message..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {touched.html && errors.html && (
                  <div className="mt-2 text-danger text-xs">{errors.html}</div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center w-full">
              <Button
                rounded="rounded-xl"
                size="h-10 sm:h-12"
                type="button"
                variant="primary"
                onClick={() => {}}
                block
                extraCSSClasses="px-12 sm:text-lg"
              >
                Send Message
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ContactSection;
