import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Button from '../../../common/Button';
import LoadingSpinner from '../../../common/LoadingSpinner';
import AdminCard from '../../common/AdminCard';
import EmailEditor from 'react-email-editor';
import { EditorRef } from 'react-email-editor';
import { useSession } from 'next-auth/react';
import {
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../../models/settings/settings';
import { toast } from 'react-toastify';
import {
  AdminPostAgent,
  AdminSettingsAgent,
} from '../../../../lib/axios/agent';
import {
  PostFormValues,
  PostStatusEnum,
  PostTypeEnum,
  PostVisibilityEnum,
} from '../../../../models/posts/admin/post';
import { defaultContactResponseDesign } from './default-contact-response-design';

const AdminContactResponseAddTemplate = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const emailEditorRef = useRef<EditorRef | null>(null);

  const onReady = () => {
    try {
      const existingDesign = JSON.parse(defaultContactResponseDesign);
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

          try {
            const templatePost = await AdminPostAgent.create(
              session,
              new PostFormValues({
                title:
                  SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID.replaceAll(
                    '_',
                    ' '
                  ),
                content: html,
                templateDesign: JSON.stringify(design),
                status: PostStatusEnum.PUBLISH,
                type: PostTypeEnum.CONTACT_EMAIL_TEMPLATE,
                slug: SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID.replaceAll(
                  '_',
                  '-'
                ).toLocaleLowerCase(),
                visibility: PostVisibilityEnum.PRIVATE,
                attachmentsIds: [],
                taxonomiesIds: [],
                slugsHistory: [],
                commentAllowed: false,
              })
            );
            await AdminSettingsAgent.upsertSettings(session, [
              {
                key: SettingsKeyEnum.SITE_CONTACT_AUTO_RESPONSE_TEMPLATE_ID,
                value: templatePost.id,
                service: SettingsServiceEnum.GENERAL,
              },
            ]);
            setSubmitting(false);
            toast.success('Custom template added successfully.', {
              className: 'bg-success text-light',
            });

            router.push('/admin/settings');
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
                    ],
                  }}
                />
              </AdminCard>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default AdminContactResponseAddTemplate;
