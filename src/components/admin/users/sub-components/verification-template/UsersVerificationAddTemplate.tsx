import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';
import Button from '../../../../common/Button';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import AdminCard from '../../../common/AdminCard';
import EmailEditor from 'react-email-editor';
import { useSession } from 'next-auth/react';
import {
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../../../models/settings/settings';
import { toast } from 'react-toastify';
import {
  AdminPostAgent,
  AdminSettingsAgent,
} from '../../../../../lib/axios/agent';
import {
  PostFormValues,
  PostStatusEnum,
  PostTypeEnum,
  PostVisibilityEnum,
} from '../../../../../models/posts/admin/post';
import { defaultVerificationDesign } from './default-verification-design';
import { defaultPassResetDesign } from './default-pass-reset-design';
import { defaultChangePassDesign } from './default-change-pass-design';

interface IProps {
  settingKey:
    | SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID
    | SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID
    | SettingsKeyEnum.USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID;
}

const UsersVerificationAddTemplate: FC<IProps> = ({ settingKey }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const emailEditorRef = useRef<EmailEditor | null>(null);

  function getAppropriateDesign() {
    if (settingKey == SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID)
      return defaultVerificationDesign;
    if (settingKey == SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID)
      return defaultPassResetDesign;
    if (settingKey == SettingsKeyEnum.USERS_EMAIL_CHANGE_PASSWORD_TEMPLATE_ID)
      return defaultChangePassDesign;
  }

  const onReady = () => {
    try {
      const existingDesign = JSON.parse(getAppropriateDesign()!);
      // @ts-ignore
      emailEditorRef.current?.editor.loadDesign(existingDesign);
    } catch (error) {
      toast.error('Something went wrong loading the default design.', {
        className: 'bg-danger text-light',
      });
    }
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (_, { setSubmitting }) => {
        emailEditorRef.current?.exportHtml(async (data) => {
          const { design, html } = data;

          setSubmitting(true);

          const regex = /{{[{]?(.*?)[}]?}}/g;
          const matches = html.match(regex);
          if (
            settingKey ===
              SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID ||
            settingKey ===
              SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID
          ) {
            if (!matches?.includes('{{token}}')) {
              toast.error(
                `Using "Token" merge tag for the template is required.`,
                {
                  className: 'bg-danger text-light',
                }
              );
              return;
            }
          }
          try {
            const templatePost = await AdminPostAgent.create(
              session,
              new PostFormValues({
                title: settingKey.replaceAll('_', ' '),
                content: html,
                templateDesign: JSON.stringify(design),
                status: PostStatusEnum.PUBLISH,
                type: PostTypeEnum.AUTH_EMAIL_TEMPLATE,
                slug: settingKey.replaceAll('_', '-').toLocaleLowerCase(),
                visibility: PostVisibilityEnum.PRIVATE,
                attachmentsIds: [],
                taxonomiesIds: [],
                slugsHistory: [],
                commentAllowed: false,
              })
            );
            await AdminSettingsAgent.upsertSettings(session, [
              {
                key: settingKey,
                value: templatePost.id,
                service: SettingsServiceEnum.USERS,
              },
            ]);
            setSubmitting(false);
            toast.success('Custom template added successfully.', {
              className: 'bg-success text-light',
            });

            router.push('/admin/users/settings');
          } catch (error) {
            setSubmitting(false);
            toast.error('Something went wrong, please try again later.', {
              className: 'bg-danger text-light',
            });
          }
        });
      }}
    >
      {({ isSubmitting, handleChange, isValid }) => (
        <Form>
          <fieldset>
            <div className="bg-light rounded-3xl p-4">
              <Button
                rounded="rounded-xl"
                size="h-10"
                type="submit"
                variant="success"
                disabled={!isValid}
                extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center mb-4 ml-auto"
              >
                {isSubmitting ? (
                  <LoadingSpinner className="w-6 h-6" />
                ) : (
                  'Save Changes'
                )}
              </Button>
              <AdminCard className="my-4">
                <EmailEditor
                  ref={emailEditorRef}
                  onReady={onReady}
                  tools={{ form: { enabled: true } }}
                  projectId={+process.env.NEXT_PUBLIC_PROJECT_ID!}
                  minHeight={600}
                  options={{
                    mergeTags: [
                      {
                        name: 'Website Name',
                        value: '{{websiteName}}',
                        sample: 'Website Name',
                      },
                      {
                        name: 'Website URL',
                        value: '{{websiteUrl}}',
                        sample: 'www.my-website-url.com',
                      },
                      {
                        name: 'Token',
                        value: '{{token}}',
                        sample: '123456',
                      },
                    ],
                  }}
                />
              </AdminCard>
            </div>

            <AdminCard className="my-4">
              <div className="text-primary text-md font-semibold">
                Merge Tags:
              </div>
              <div className="text-zinc-700 text-xs sm:text-sm">
                <span className="font-semibold">Note:</span> Merge tags must be
                used within the context of your template to display necessary
                information, otherwise system does not work as expected.
              </div>
              <ul className="space-y-2 mt-4 text-xs sm:text-sm leading-5 sm:leading-6">
                {(settingKey ===
                  SettingsKeyEnum.USERS_EMAIL_VERIFICATION_TEMPLATE_ID ||
                  settingKey ===
                    SettingsKeyEnum.USERS_EMAIL_RESET_PASSWORD_TEMPLATE_ID) && (
                  <li className="text-zinc-700">
                    <span className="text-light bg-primary p-1 rounded mr-2">
                      Token
                    </span>{' '}
                    Replaces with issued token. Only use this for{' '}
                    <span className="font-semibold">Reset Password</span> or{' '}
                    <span className="font-semibold">Email Verification</span>{' '}
                    templates.
                  </li>
                )}

                <li className="text-zinc-700">
                  <span className="text-light bg-primary p-1 rounded mr-2">
                    Website Name
                  </span>{' '}
                  Replaces with{' '}
                  <span className="font-semibold">website name</span> and should
                  be used for all templates.
                </li>
                <li className="text-zinc-700">
                  <span className="text-light bg-primary p-1 rounded mr-2">
                    Website URL
                  </span>{' '}
                  Replace with the{' '}
                  <span className="font-semibold">website url</span> and can be
                  used for all templates.
                </li>
              </ul>
            </AdminCard>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default UsersVerificationAddTemplate;
