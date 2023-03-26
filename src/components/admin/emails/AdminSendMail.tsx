import React, { useRef, useState } from 'react';
import ConfirmModal from '../../common/ConfirmModal';
import EmailEditor from 'react-email-editor';
import { EditorRef } from 'react-email-editor';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { AdminEmailAgent, AdminPostAgent } from '../../../lib/axios/agent';
import { AxiosError } from 'axios';
import { INestError } from '../../../models/common/error';
import { GroupBase, StylesConfig } from 'react-select';
import { Session } from 'next-auth';
import AdminCard from '../common/AdminCard';
import { Field, Form, Formik } from 'formik';
import DropdownMenu from '../../common/DropdownMenu';
import Button from '../../common/Button';
import LoadingSpinner from '../../common/LoadingSpinner';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import Modal from '../../common/Modal';
import AsyncSelect from 'react-select/async';
import { defaultEmailTemplateDesign } from './templates/default-email-template-design';
import {
  EmailPriorityEnum,
  EmailSendFormValues,
} from '../../../models/emails/email';

const AdminSendMail = () => {
  const emailEditorRef = useRef<EditorRef | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [loadBlankConfirmModalShow, setLoadBlankConfirmModalShow] =
    useState(false);
  const [loadTemplateModalShow, setLoadTemplateModalShow] = useState(false);
  const [loadDesignModalShow, setLoadDesignModalShow] = useState(false);
  const [designStringifiedJSON, setDesignStringifiedJSON] = useState<
    string | undefined
  >(undefined);

  const commaSeparatedEmailsRegex = new RegExp(
    /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]+[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]+)[\W]*$/
  );

  const validationSchema = Yup.object({
    from: Yup.string().email().required('The field value is required'),
    to: Yup.string()
      .matches(
        commaSeparatedEmailsRegex,
        'Please enter a standard email address or some comma separated email addresses'
      )
      .required('The field value is required'),
    subject: Yup.string().required('The field value is required'),
    cc: Yup.string().matches(
      commaSeparatedEmailsRegex,
      'Please enter a standard email address or some comma separated email addresses'
    ),
    bcc: Yup.string().matches(
      commaSeparatedEmailsRegex,
      'Please enter a standard email address or some comma separated email addresses'
    ),
    replyTo: Yup.string().email(),
    priority: Yup.mixed().oneOf(Object.values(EmailPriorityEnum)),
  });

  const onReady = () => {
    try {
      const existingDesign = JSON.parse(defaultEmailTemplateDesign);
      // @ts-ignore
      emailEditorRef.current?.editor.loadDesign(existingDesign);
    } catch (error) {
      toast.error('Something went wrong loading the default design.', {
        className: 'bg-danger text-light',
      });
    }
    // Upload to our custom storage
    emailEditorRef.current?.registerCallback('image', async (file, done) => {
      const formData = new FormData();
      formData.append('img', file.attachments[0]);

      try {
        const uploadedImg = await AdminEmailAgent.uploadImg(session, formData);
        done({
          progress: 100,
          url: `${process.env.NEXT_PUBLIC_STORAGE_FILE_BASE_URL}/${uploadedImg.key}`,
        });
      } catch (error) {
        const err = error as AxiosError<INestError>;
        if (err.response?.data.statusCode === 400) {
          toast.error(
            'File size must be less than 5MB and file type could be JPG, PNG or Gif',
            {
              className: 'bg-danger text-light text-sm',
            }
          );
          return;
        }

        toast.error('Something went wrong, please try again later.', {
          className: 'bg-danger text-light text-sm',
        });
      }
    });
  };

  const reactSelectStyle:
    | StylesConfig<string, false, GroupBase<string>>
    | undefined = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      minWidth: '250px',
      width: '100%',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      borderColor: !state.isFocused ? '#f4f4f5' : '#8479E1',
      borderWidth: '2px',
      boxShadow: 'none',
      ':hover': {
        ...baseStyles[':hover'],
        borderColor: '#8479E1',
      },
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      ':focus': {
        ...baseStyles[':focus'],
        border: '0px',
        boxShadow: 'none',
        outline: 'none',
      },
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#8479E1'
        : isFocused
        ? '#d1cdf3'
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? '#fff'
          ? 'white'
          : 'black'
        : '#3f3f46',
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#8479E1'
            : '#8479E1'
          : undefined,
      },
    }),
  };

  // Select Template Options Loader
  const templateOptionsLoader = async (
    inputValue: string,
    session: Session | null
  ) => {
    if (inputValue?.length && inputValue.length > 2) {
      try {
        const { items } = await AdminPostAgent.emailTemplatesList(
          session,
          `?searchBy.title=${inputValue}&orderBy.createdAt=DESC`
        );
        return items.map((i) => ({
          value: i.templateDesign,
          label: i.title,
        }));
      } catch (error) {}
    }
  };

  return (
    <>
      <ConfirmModal
        onCancel={() => {
          setLoadBlankConfirmModalShow(false);
        }}
        onConfirm={async () => {
          // @ts-ignore
          emailEditorRef.current?.editor.loadBlank({});
          setLoadBlankConfirmModalShow(false);
        }}
        show={loadBlankConfirmModalShow}
        text="Are you sure you want to load a blank page in editor?"
      />
      <Modal
        show={loadTemplateModalShow}
        onClose={() => setLoadTemplateModalShow(false)}
      >
        <div className="flex flex-col justify-start items-center min-h-[10rem]">
          <div className="text-sm text-zinc-700 mb-4">
            Search title of an existing template and select it to import
          </div>
          <AsyncSelect
            styles={reactSelectStyle}
            placeholder="Template Title"
            isClearable
            isSearchable
            cacheOptions
            defaultOptions
            name="loadedTemplate"
            onChange={(newValue: any, actionMeta) => {
              if (newValue?.value) {
                // @ts-ignore
                emailEditorRef.current?.editor.loadDesign(
                  JSON.parse(newValue.value)
                );
              }
            }}
            loadOptions={(inputValue) =>
              templateOptionsLoader(inputValue, session) as any
            }
          />
        </div>
      </Modal>
      <Modal
        show={loadDesignModalShow}
        onClose={() => setLoadDesignModalShow(false)}
      >
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="text-sm text-zinc-700">
            Paste design (JSON) into the following textarea, then import it.
          </div>
          <textarea
            name="designTemplate"
            className={`border-0 rounded-xl bg-zinc-100 min-w-[20rem] w-full h-96 placeholder-zinc-400 text-xs sm:text-sm focus:border-2 focus:border-primary focus:bg-light`}
            value={designStringifiedJSON}
            placeholder="Paste Template Design (JSON) Here"
            onChange={(e) => setDesignStringifiedJSON(e.target.value)}
          ></textarea>
          <Button
            type="button"
            size="h-9"
            rounded="rounded-xl"
            variant="primary"
            extraCSSClasses="px-2.5 text-xs sm:text-sm transition-all duration-300 flex justify-center items-center focus:ring-0 focus:ring-offset-0"
            block
            onClick={() => {
              if (designStringifiedJSON) {
                try {
                  const designJSON = JSON.parse(designStringifiedJSON);
                  // @ts-ignore
                  emailEditorRef.current?.editor.loadDesign(designJSON);
                  setLoadDesignModalShow(false);
                  setDesignStringifiedJSON(undefined);
                } catch (error) {
                  toast.error(
                    'Something went wrong loading the design. Please enter a correct design.',
                    {
                      className: 'bg-danger text-light',
                    }
                  );
                  setDesignStringifiedJSON(undefined);
                }
              }
            }}
          >
            Import
          </Button>
        </div>
      </Modal>
      <div>
        <AdminCard className="overflow-x-auto">
          <Formik
            initialValues={{
              from: '',
              to: '',
              subject: '',
              cc: '',
              bcc: '',
              replyTo: '',
              priority: EmailPriorityEnum.NORMAL,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              emailEditorRef.current?.exportHtml(async (data) => {
                const { design, html } = data;

                try {
                  setSubmitting(true);

                  await AdminEmailAgent.sendMail(
                    session,
                    new EmailSendFormValues({
                      ...values,
                      templateDesign: JSON.stringify(design),
                      html,
                    })
                  );

                  resetForm();
                  setSubmitting(false);
                  router.push('/admin/emails/sent');
                  toast.success(`The email has been sent successfully`, {
                    className: 'bg-success text-light',
                  });
                } catch (error) {
                  setSubmitting(false);
                  toast.error('Something went wrong. Please try again later.', {
                    className: 'bg-danger text-light',
                  });
                }
              });
            }}
          >
            {({
              isSubmitting,
              values,
              isValid,
              touched,
              errors,
              handleChange,
            }) => (
              <Form>
                <fieldset className="pr-4 xl:pr-0">
                  <div className="flex justify-start items-center mb-4">
                    <DropdownMenu
                      btnValue={
                        <Button
                          type="button"
                          size="h-10"
                          rounded="rounded-xl"
                          variant="primary"
                          extraCSSClasses="px-2.5 text-xs sm:text-sm transition-all duration-300 flex items-center focus:ring-0 focus:ring-offset-0"
                          onClick={() => {}}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z" />
                          </svg>
                        </Button>
                      }
                      alignment="left"
                      dropDownFromTopCss="top-11"
                    >
                      <DropdownMenu.Item
                        onClick={() => setLoadBlankConfirmModalShow(true)}
                      >
                        Load Blank
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => setLoadTemplateModalShow(true)}
                      >
                        Load Template
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => setLoadDesignModalShow(true)}
                      >
                        Load Design (JSON)
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => {
                          emailEditorRef.current?.exportHtml(async (data) => {
                            const { design, html } = data;
                            navigator.clipboard.writeText(
                              JSON.stringify(design)
                            );
                            toast.success(
                              `The Design copied to clipboard successfully`,
                              {
                                className: 'bg-success text-light',
                              }
                            );
                          });
                        }}
                      >
                        Copy Design
                      </DropdownMenu.Item>
                    </DropdownMenu>
                    <Button
                      rounded="rounded-xl"
                      size="h-10"
                      type="submit"
                      variant="success"
                      disabled={!isValid}
                      extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center ml-auto"
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="w-6 h-6" />
                      ) : (
                        'Send'
                      )}
                    </Button>
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="from"
                      placeholder="From"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="to"
                      placeholder="To (Multiple comma-separated email addresses are allowed)"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="subject"
                      placeholder="Subject"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="cc"
                      placeholder="CC (Comma-separated email addresses)"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="bcc"
                      placeholder="BCC (Comma-separated email addresses)"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="replyTo"
                      placeholder="Reply To"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      className={`self-start ${
                        touched.priority && errors.priority ? 'text-danger' : ''
                      } text-zinc-700 text-xs`}
                    >
                      Priority:
                    </label>
                    <select
                      name="priority"
                      className={`text-xs sm:text-sm h-11 bg-zinc-100 border-0 rounded-lg ${
                        !!values.priority ? 'text-zinc-700' : 'text-zinc-400'
                      } focus:text-zinc-700 focus:border-2 focus:border-primary focus:bg-light mb-8`}
                      defaultValue={EmailPriorityEnum.NORMAL}
                      onChange={handleChange}
                    >
                      <option value={EmailPriorityEnum.LOW}>Low</option>
                      <option value={EmailPriorityEnum.NORMAL}>Normal</option>
                      <option value={EmailPriorityEnum.HIGH}>High</option>
                    </select>
                  </div>

                  <EmailEditor
                    ref={emailEditorRef}
                    onReady={onReady}
                    tools={{ form: { enabled: true } }}
                    projectId={+process.env.NEXT_PUBLIC_PROJECT_ID!}
                    minHeight={850}
                  />
                </fieldset>
              </Form>
            )}
          </Formik>
        </AdminCard>
      </div>
    </>
  );
};

export default AdminSendMail;
