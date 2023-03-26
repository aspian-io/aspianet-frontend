import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Button from '../../../common/Button';
import LoadingSpinner from '../../../common/LoadingSpinner';
import AdminCard from '../../common/AdminCard';
import EmailEditor from 'react-email-editor';
import { EditorRef } from 'react-email-editor';
import { AdminPostAgent } from '../../../../lib/axios/agent';
import { useSession } from 'next-auth/react';
import { AdminPostKeys } from '../../../../lib/swr/keys';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { INestError } from '../../../../models/common/error';
import Loading from '../../../common/Loading';
import {
  IPostEntity,
  PostFormValues,
} from '../../../../models/posts/admin/post';
import { toast } from 'react-toastify';

const AdminContactResponseEditTemplate = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const templateId = router.query.id as string;
  const emailEditorRef = useRef<EditorRef | null>(null);

  const postDetailsFetcher = () => AdminPostAgent.details(session, templateId);

  const {
    data: postData,
    error,
    mutate,
  } = useSWR<IPostEntity, AxiosError<INestError>>(
    `${AdminPostKeys.GET_POST_DETAILS}/${templateId}`,
    postDetailsFetcher
  );

  if (error) router.push('/500');
  if (!postData) return <Loading />;

  const onReady = () => {
    try {
      const existingDesign = JSON.parse(postData.templateDesign!);
      // @ts-ignore
      emailEditorRef.current?.editor.loadDesign(existingDesign);
    } catch (error) {
      toast.error('Something went wrong loading the template design.', {
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
            await AdminPostAgent.edit(
              session,
              templateId,
              new PostFormValues({
                ...postData,
                content: html,
                templateDesign: JSON.stringify(design),
              })
            );
            await mutate();
            setSubmitting(false);
            toast.success('Custom template modified successfully.', {
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
      {({ isSubmitting, isValid, dirty }) => (
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

export default AdminContactResponseEditTemplate;
