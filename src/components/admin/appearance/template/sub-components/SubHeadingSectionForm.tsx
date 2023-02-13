import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC } from 'react';
import { GroupBase, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import { AdminPostAgent } from '../../../../../lib/axios/agent';
import {
  IPostEntity,
  PostFormValues,
  WidgetTypeEnum,
} from '../../../../../models/posts/admin/post';
import Accordion from '../../../../common/Accordion';
import AdminSelectMediaOptions from '../../../common/react-select/AdminSelectMediaOptions';
import { featuredImageOptionsLoader } from '../../../posts/post-react-select-loaders';
import Button from '../../../../common/Button';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { INestError } from '../../../../../models/common/error';
import { AdminPostKeys } from '../../../../../lib/swr/keys';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';

interface IContent {
  content_title?: string;
  content_description?: string;
}

const SubHeadingSectionForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = () =>
    AdminPostAgent.getWidgetsByType(session, WidgetTypeEnum.SERVICE_WIDGET);

  const {
    data: serviceWidgetsData,
    error,
    mutate,
  } = useSWR<IPostEntity[], AxiosError<INestError>>(
    `${AdminPostKeys.GET_WIDGETS_LIST}?type=${WidgetTypeEnum.SERVICE_WIDGET}`,
    fetcher
  );

  if (!serviceWidgetsData)
    return <LoadingSpinner className="text-primary w-9 h-9 my-20" />;
  if (error) router.push('/500');

  serviceWidgetsData.sort((a, b) => Number(a.order) - Number(b.order));

  const firstSegData = serviceWidgetsData[0];
  const secondSegData = serviceWidgetsData[1];
  const thirdSegData = serviceWidgetsData[2];

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full">
      <div className="p-4 bg-light rounded-2xl w-full space-y-4">
        <Accordion
          title="First Segment"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor
            session={session}
            postData={firstSegData}
            order={0}
          />
        </Accordion>
        <Accordion
          title="Second Segment"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor
            session={session}
            postData={secondSegData}
            order={1}
          />
        </Accordion>
        <Accordion
          title="Third Segment"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor
            session={session}
            postData={thirdSegData}
            order={2}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default SubHeadingSectionForm;

interface ISegmentContentEditorProps {
  session: Session | null;
  postData: IPostEntity;
  order: number;
}

const SegmentContentEditor: FC<ISegmentContentEditorProps> = ({
  session,
  postData,
  order,
}) => {
  const animatedComponents = makeAnimated();
  const reactSelectStyle:
    | StylesConfig<string, false, GroupBase<string>>
    | undefined = {
    control: (baseStyles, state) => ({
      ...baseStyles,
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
      maxHeight: '120px',
      overflowY: 'scroll',
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

  function getContentObject(): IContent {
    if (postData && postData?.content) {
      const content: IContent = JSON.parse(postData.content);
      return {
        content_title: content.content_title,
        content_description: content.content_description,
      };
    }

    return {
      content_title: '',
      content_description: '',
    };
  }

  return (
    <Formik
      initialValues={{
        ...new PostFormValues(postData),
        ...getContentObject(),
      }}
      onSubmit={async (values) => {
        const post = new PostFormValues(values);
        post.title = `${WidgetTypeEnum.SERVICE_WIDGET}_${Date.now()}`;
        post.slug = `${WidgetTypeEnum.SERVICE_WIDGET.replace(
          '_',
          '-'
        ).toLowerCase()}-${Date.now()}`;
        post.type = WidgetTypeEnum.SERVICE_WIDGET;
        post.order = order;
        post.content = JSON.stringify({
          content_title: values.content_title,
          content_description: values.content_description,
        });

        try {
          if (postData) {
            await AdminPostAgent.edit(session, postData.id, post);
            // Revalidate Home Page
            await AdminPostAgent.revalidateHomePage(session);
            toast.success(
              `The modification operation was completed successfully`,
              {
                className: 'bg-success text-light',
              }
            );
          } else {
            await AdminPostAgent.create(session, post);
            // Revalidate Home Page
            await AdminPostAgent.revalidateHomePage(session);

            toast.success(`The creation operation was completed successfully`, {
              className: 'bg-success text-light',
            });
          }
        } catch (error) {
          toast.error('Something went wrong. Please try again later.', {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({
        isSubmitting,
        handleChange,
        handleBlur,
        dirty,
        touched,
        errors,
        values,
      }) => (
        <Form className="w-full">
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="content_title"
              placeholder="Title"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className={`${
                touched.content_description && errors.content_description
                  ? 'text-danger'
                  : ''
              } self-start text-dark text-xs`}
            >
              Description:
            </label>
            <textarea
              name="content_description"
              className={`border-0 rounded-xl bg-zinc-100 w-full h-20 md:h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                errors.content_description && touched.content_description
                  ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                  : ' focus:border-2 focus:border-primary focus:bg-light'
              }`}
              maxLength={400}
              value={
                values.content_description?.length
                  ? values.content_description
                  : ''
              }
              placeholder="Description..."
              onBlur={handleBlur}
              onChange={handleChange}
            ></textarea>
          </div>
          {touched.content_description && errors.content_description && (
            <div className="mt-2 text-danger text-xs">
              {errors.content_description}
            </div>
          )}
          <div className="mt-4 mb-32">
            <AsyncSelect
              components={animatedComponents}
              styles={reactSelectStyle}
              placeholder="Featured Image"
              defaultValue={
                postData?.featuredImage
                  ? ({
                      value: postData?.featuredImage?.id,
                      label: (
                        <AdminSelectMediaOptions
                          {...postData.featuredImage}
                          fileKey={postData.featuredImage.key}
                        />
                      ),
                    } as any)
                  : undefined
              }
              isClearable
              isSearchable
              cacheOptions
              defaultOptions
              name="featuredImageId"
              onChange={(newValue: any, actionMeta) => {
                handleChange({
                  target: {
                    name: 'featuredImageId',
                    value: newValue?.value ?? null,
                  },
                });
              }}
              loadOptions={(inputValue) =>
                featuredImageOptionsLoader(inputValue, session) as any
              }
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <Button
              rounded="rounded-xl"
              size="h-10"
              type="submit"
              variant="success"
              disabled={!dirty}
              extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center"
            >
              {isSubmitting ? (
                <LoadingSpinner className="w-6 h-6" />
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
