import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { GroupBase, StylesConfig } from 'react-select';
import useSWR from 'swr';
import { AdminPostAgent } from '../../../../../lib/axios/agent';
import { AdminPostKeys } from '../../../../../lib/swr/keys';
import { INestError } from '../../../../../models/common/error';
import {
  IPostEntity,
  PostFormValues,
  WidgetTypeEnum,
} from '../../../../../models/posts/admin/post';
import makeAnimated from 'react-select/animated';
import LoadingSpinner from '../../../../common/LoadingSpinner';
import AsyncSelect from 'react-select/async';
import AdminSelectMediaOptions from '../../../common/react-select/AdminSelectMediaOptions';
import { featuredImageOptionsLoader } from '../../../posts/post-react-select-loaders';
import Button from '../../../../common/Button';
import { toast } from 'react-toastify';
import FormikInput, { InputTypeEnum } from '../../../../common/FormikInput';

interface IContent {
  part_1?: string;
  part_2?: string;
  part_3?: string;
  btn1_title?: string;
  btn1_href?: string;
  btn2_title?: string;
  btn2_href?: string;
}

const HeroSectionForm = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const fetcher = () =>
    AdminPostAgent.getWidgetsByType(session, WidgetTypeEnum.HERO_WIDGET);

  const {
    data: heroWidgetsData,
    error,
    mutate,
  } = useSWR<IPostEntity[], AxiosError<INestError>>(
    `${AdminPostKeys.GET_WIDGETS_LIST}?type=${WidgetTypeEnum.HERO_WIDGET}`,
    fetcher
  );

  if (!heroWidgetsData)
    return <LoadingSpinner className="text-primary w-9 h-9 my-20" />;
  if (error) router.push('/500');

  const initialValues: PostFormValues = new PostFormValues(
    heroWidgetsData && heroWidgetsData.length > 0
      ? {
          ...heroWidgetsData[0],
          featuredImageId: heroWidgetsData[0]?.featuredImage?.id,
          storeOldSlugToRedirect: false,
        }
      : undefined
  );

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
    if (heroWidgetsData && heroWidgetsData[0]?.content) {
      const content: IContent = JSON.parse(heroWidgetsData[0].content);
      return {
        part_1: content.part_1,
        part_2: content.part_2,
        part_3: content.part_3,
        btn1_title: content.btn1_title,
        btn1_href: content.btn1_href,
        btn2_title: content.btn2_title,
        btn2_href: content.btn2_href,
      };
    }

    return {
      part_1: '',
      part_2: '',
      part_3: '',
      btn1_title: '',
      btn1_href: '',
      btn2_title: '',
      btn2_href: '',
    };
  }

  return (
    <Formik
      initialValues={{
        ...initialValues,
        ...getContentObject(),
      }}
      onSubmit={async (values) => {
        const post = new PostFormValues(values);
        post.title = WidgetTypeEnum.HERO_WIDGET;
        post.slug = WidgetTypeEnum.HERO_WIDGET.replace('_', '-').toLowerCase();
        post.storeOldSlugToRedirect = false;
        post.type = WidgetTypeEnum.HERO_WIDGET;
        post.content = JSON.stringify({
          part_1: values.part_1,
          part_2: values.part_2,
          part_3: values.part_3,
          btn1_title: values.btn1_title,
          btn1_href: values.btn1_href,
          btn2_title: values.btn2_title,
          btn2_href: values.btn2_href,
        });

        try {
          if (heroWidgetsData[0]) {
            await AdminPostAgent.edit(session, heroWidgetsData[0].id, post);
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
              name="part_1"
              placeholder="First Part"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="part_2"
              placeholder="Second Part"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className={`${
                touched.part_3 && errors.part_3 ? 'text-danger' : ''
              } self-start text-dark text-xs`}
            >
              Description:
            </label>
            <textarea
              name="part_3"
              className={`border-0 rounded-xl bg-zinc-100 w-full h-20 md:h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                errors.part_3 && touched.part_3
                  ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                  : ' focus:border-2 focus:border-primary focus:bg-light'
              }`}
              maxLength={400}
              value={values.part_3?.length ? values.part_3 : ''}
              placeholder="Description..."
              onBlur={handleBlur}
              onChange={handleChange}
            ></textarea>
          </div>
          {touched.part_3 && errors.part_3 && (
            <div className="mt-2 text-danger text-xs">{errors.part_3}</div>
          )}
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="btn1_title"
              placeholder="First Button Title"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="btn1_href"
              placeholder="First Button Link"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="btn2_title"
              placeholder="Second Button Title"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="mb-4">
            <Field
              type={InputTypeEnum.text}
              name="btn2_href"
              placeholder="Second Button Link"
              className="text-xs sm:text-sm h-10 rounded-xl"
              component={FormikInput}
            />
          </div>
          <div className="mb-20">
            <AsyncSelect
              components={animatedComponents}
              styles={reactSelectStyle}
              placeholder="Featured Image"
              defaultValue={
                heroWidgetsData[0]?.featuredImage
                  ? ({
                      value: heroWidgetsData[0]?.featuredImage?.id,
                      label: (
                        <AdminSelectMediaOptions
                          {...heroWidgetsData[0].featuredImage}
                          fileKey={heroWidgetsData[0].featuredImage.key}
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

export default HeroSectionForm;
