import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC, useCallback } from 'react';
import * as Yup from 'yup';
import {
  PostFormValues,
  PostVisibilityEnum,
  PostStatusEnum,
  PostErrorsInternalCodeEnum,
  PostTypeEnum,
  IPostEntity,
} from '../../../models/posts/admin/post';
import Accordion from '../../common/Accordion';
import Button from '../../common/Button';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import LoadingSpinner from '../../common/LoadingSpinner';
import TinyMce from '../common/text-editor/TinyMce';
import AsyncSelect from 'react-select/async';
import { StylesConfig, GroupBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  attachmentsOptionsLoader,
  categoriesOptionsLoader,
  featuredImageOptionsLoader,
  parentOptionsLoader,
  projectOwnerOptionsLoader,
  tagsOptionsLoader,
} from './post-react-select-loaders';
import slugify from 'slugify';
import { AdminPostAgent } from '../../../lib/axios/agent';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { INestError } from '../../../models/common/error';
import { TaxonomyTypeEnum } from '../../../models/taxonomies/admin/taxonomy';
import AdminSelectMediaOptions from '../common/react-select/AdminSelectMediaOptions';
import moment from 'moment';
import Link from 'next/link';
import { UAParser } from 'ua-parser-js';

interface IProps {
  editPostId?: string;
  editPostData?: IPostEntity;
  postType: PostTypeEnum;
  onCreateSuccess?: (id: string) => any;
}

const AdminPostForm: FC<IProps> = ({
  postType,
  editPostId = undefined,
  editPostData = undefined,
  onCreateSuccess = () => {},
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const agentParser = new UAParser(editPostData?.userAgent);

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

  const getSelectFormattedTaxonomiesByType = useCallback(
    (type: TaxonomyTypeEnum) => {
      const typedTaxonomies = editPostData?.taxonomies.filter(
        (t) => t.type === type
      );
      return typedTaxonomies?.map((c) => ({
        value: c.id,
        label: c.term,
      }));
    },
    [editPostData?.taxonomies]
  );

  const getSelectTaxonomiesIdsByType = useCallback(
    (type: TaxonomyTypeEnum) => {
      const typedTaxonomies = editPostData?.taxonomies.filter(
        (t) => t.type === type
      );
      return typedTaxonomies?.map((c) => c.id);
    },
    [editPostData?.taxonomies]
  );

  const initialValues: PostFormValues & {
    categoryIds?: string[];
    tagIds?: string[];
  } = new PostFormValues(
    editPostData
      ? {
          ...editPostData,
          parentId: editPostData?.parent?.id,
          featuredImageId: editPostData?.featuredImage?.id,
          taxonomiesIds: editPostData?.taxonomies?.map((t) => t.id),
          attachmentsIds: editPostData?.attachments?.map((a) => a.id),
          storeOldSlugToRedirect: true,
        }
      : undefined
  );
  initialValues.categoryIds = getSelectTaxonomiesIdsByType(
    TaxonomyTypeEnum.CATEGORY
  );
  initialValues.tagIds = getSelectTaxonomiesIdsByType(TaxonomyTypeEnum.TAG);
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, 'The post title must be less than 100 characters')
      .required('Please enter the post title'),
    subtitle: Yup.string().max(
      100,
      'The post subtitle must be less than 100 characters'
    ),
    excerpt: Yup.string().max(
      100,
      'The post subtitle must be less than 100 characters'
    ),
    content: Yup.string(),
    slug: Yup.string()
      .required('Please enter slug')
      .matches(
        slugRegex,
        'Uppercase letters, lowercase letters, hyphens and numbers are allowed'
      )
      .max(100, 'Slug must be less than 100 characters'),
    visibility: Yup.mixed().oneOf(Object.values(PostVisibilityEnum)),
    status: Yup.mixed().oneOf(Object.values(PostStatusEnum)),
    scheduledToPublish: Yup.date().nullable(),
    scheduledToArchive: Yup.date().nullable(),
    commentAllowed: Yup.boolean(),
    isPinned: Yup.boolean(),
    order: Yup.number().min(
      0,
      'The post order minimum value cannot be negative'
    ),
  });

  const pinCheckBoxNeeded =
    postType === PostTypeEnum.BLOG || postType === PostTypeEnum.NEWS;

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setFieldError }) => {
        try {
          const post = new PostFormValues(values);
          post.type = postType;
          const taxonomiesIds: string[] = [];

          if (values.categoryIds && values.categoryIds.length > 0)
            taxonomiesIds.push(...values.categoryIds);
          if (values.tagIds && values.tagIds.length > 0)
            taxonomiesIds.push(...values.tagIds);

          post.taxonomiesIds = taxonomiesIds;
          if (editPostId) {
            const editResult = await AdminPostAgent.edit(
              session,
              editPostId,
              post
            );

            toast.success(
              `The modification operation was completed successfully`,
              {
                className: 'bg-success text-light',
              }
            );

            const resultValues: PostFormValues & {
              categoryIds?: string[];
              tagIds?: string[];
            } = new PostFormValues({
              ...editResult,
              parentId: editResult?.parent?.id,
              featuredImageId: editResult?.featuredImage?.id,
              taxonomiesIds: editResult?.taxonomies?.map((t) => t.id),
              attachmentsIds: editResult?.attachments?.map((a) => a.id),
              storeOldSlugToRedirect: true,
            });
            resultValues.categoryIds = getSelectTaxonomiesIdsByType(
              TaxonomyTypeEnum.CATEGORY
            );
            resultValues.tagIds = getSelectTaxonomiesIdsByType(
              TaxonomyTypeEnum.TAG
            );

            router.reload();
          } else {
            const result = await AdminPostAgent.create(session, post);

            toast.success(`The creation operation was completed successfully`, {
              className: 'bg-success text-light',
            });

            onCreateSuccess(result.id);
          }
        } catch (error) {
          const err = error as AxiosError<INestError>;
          if (
            err.response?.data.internalCode ===
            PostErrorsInternalCodeEnum.DUPLICATE_SLUG
          ) {
            setFieldError(
              'slug',
              'The slug is in use. Please enter a unique slug.'
            );
            return toast.error(err.response?.data.message, {
              className: 'bg-danger text-light',
            });
          }

          toast.error(err.response?.data.message, {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({
        isSubmitting,
        values,
        setValues,
        setFieldValue,
        isValid,
        dirty,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) => (
        <Form>
          <fieldset>
            <div className="bg-light rounded-3xl p-4">
              <Button
                rounded="rounded-xl"
                size="h-10"
                type="submit"
                variant="success"
                disabled={!(isValid && dirty)}
                extraCSSClasses="w-28 sm:w-32 text-xs sm:text-sm px-2 sm:px-4 flex justify-center items-center mb-4 ml-auto"
              >
                {isSubmitting ? (
                  <LoadingSpinner className="w-6 h-6" />
                ) : (
                  'Save Changes'
                )}
              </Button>
              <div className="flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-2/3 xl:w-3/4">
                  <div className="mb-4">
                    <Field
                      type={InputTypeEnum.text}
                      name="title"
                      placeholder="Title"
                      className="text-xs sm:text-sm h-11 rounded-xl"
                      component={FormikInput}
                      value={values.title}
                      onBlur={(
                        e: React.FocusEvent<HTMLInputElement, Element>
                      ) => {
                        handleBlur(e);
                        if (values.title && !values.slug) {
                          const slug = slugify(values.title, { lower: true });
                          setFieldValue('slug', slug);
                        }
                      }}
                    />
                  </div>
                  <>
                    <div className="mb-4">
                      <Field
                        type={InputTypeEnum.text}
                        name="subtitle"
                        placeholder="Subtitle"
                        className="text-xs sm:text-sm h-11 rounded-xl"
                        component={FormikInput}
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        type={InputTypeEnum.text}
                        name="slug"
                        placeholder="Slug"
                        className="text-xs sm:text-sm h-11 rounded-xl"
                        component={FormikInput}
                      />
                    </div>
                  </>
                  {editPostData && editPostData.slug !== values.slug && (
                    <div className="flex flex-row justify-start items-start space-x-2 mb-4">
                      <Field
                        id="storeOldSlugToRedirect"
                        type={InputTypeEnum.checkbox}
                        name="storeOldSlugToRedirect"
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                        checked={values.storeOldSlugToRedirect}
                      />
                      <label
                        htmlFor="storeOldSlugToRedirect"
                        className="text-zinc-700 text-sm"
                      >
                        Redirect 301
                      </label>
                    </div>
                  )}
                  <TinyMce
                    style="border-radius: 16px"
                    height={!!editPostId && !!editPostData ? 648 : 583}
                    content={editPostData?.content ?? ''}
                    onEditorChange={(content) =>
                      handleChange({
                        target: { name: 'content', value: content },
                      })
                    }
                  />
                </div>
                <div className="w-full lg:w-1/3 xl:w-1/4 h-full mt-4 lg:ml-4 space-y-4">
                  <Accordion
                    title="Status & Visibility"
                    bodyClassName="space-y-4"
                    expandInitialState
                  >
                    <div className="flex flex-col w-full">
                      <label
                        className={`self-start ${
                          touched.visibility && errors.visibility
                            ? 'text-danger'
                            : ''
                        } text-zinc-700 text-xs`}
                      >
                        Visibility:
                      </label>
                      <select
                        name="visibility"
                        className={`text-xs sm:text-sm h-9 bg-zinc-100 border-0 rounded-lg ${
                          !!values.visibility
                            ? 'text-zinc-700'
                            : 'text-zinc-400'
                        } focus:text-zinc-700 focus:border-2 focus:border-primary focus:bg-light`}
                        defaultValue={PostVisibilityEnum.PUBLIC}
                        onChange={handleChange}
                      >
                        <option value={PostVisibilityEnum.PUBLIC}>
                          Public
                        </option>
                        <option value={PostVisibilityEnum.PRIVATE}>
                          Private
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        className={`self-start ${
                          touched.visibility && errors.visibility
                            ? 'text-danger'
                            : ''
                        } text-zinc-700 text-xs`}
                      >
                        Status:
                      </label>
                      <select
                        name="status"
                        className={`text-xs sm:text-sm h-9 bg-zinc-100 border-0 rounded-lg ${
                          !!values.status ? 'text-zinc-700' : 'text-zinc-400'
                        } focus:text-zinc-700 focus:border-2 focus:border-primary focus:bg-light`}
                        disabled={values.parentId ? true : false}
                        value={
                          values.parentId
                            ? PostStatusEnum.INHERIT
                            : values.status
                        }
                        onChange={handleChange}
                      >
                        <option value={PostStatusEnum.PUBLISH}>Publish</option>
                        <option value={PostStatusEnum.ARCHIVE}>Archive</option>
                        <option value={PostStatusEnum.DRAFT}>Draft</option>
                        <option value={PostStatusEnum.FUTURE}>
                          Future (Scheduled Publish)
                        </option>
                        <option value={PostStatusEnum.PENDING}>
                          Pending For Review
                        </option>
                        {postType === PostTypeEnum.BLOG && (
                          <option value={PostStatusEnum.INHERIT}>
                            Inherit
                          </option>
                        )}
                      </select>
                    </div>
                    <div
                      className={`space-y-4 ${
                        values.status === PostStatusEnum.FUTURE
                          ? 'visible max-h-40'
                          : 'invisible max-h-0'
                      } transition-all duration-300`}
                    >
                      <Field
                        type={InputTypeEnum.date}
                        name="scheduledToPublish"
                        showTimeSelect
                        placeholder="Publish Date"
                        className="text-xs sm:text-sm h-9 rounded-lg w-full flex text-zinc-700"
                        component={FormikInput}
                      />
                      <Field
                        type={InputTypeEnum.date}
                        name="scheduledToArchive"
                        showTimeSelect
                        placeholder="Archive Date"
                        className="text-xs sm:text-sm h-9 rounded-lg w-full flex text-zinc-700"
                        component={FormikInput}
                      />
                    </div>
                    {pinCheckBoxNeeded && (
                      <div className="flex flex-row justify-start items-start space-x-2">
                        <Field
                          id="isPinned"
                          type={InputTypeEnum.checkbox}
                          name="isPinned"
                          className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                          checked={values.isPinned ? true : false}
                        />
                        <label
                          htmlFor="isPinned"
                          className="text-zinc-700 text-sm"
                        >
                          Stick to the top (Pinned)
                        </label>
                      </div>
                    )}
                    <div className="flex flex-row justify-start items-start space-x-2">
                      <Field
                        id="commentAllowed"
                        type={InputTypeEnum.checkbox}
                        name="commentAllowed"
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                        checked={values.commentAllowed ? true : false}
                      />
                      <label
                        htmlFor="commentAllowed"
                        className="text-zinc-700 text-sm"
                      >
                        Allow comments
                      </label>
                    </div>
                  </Accordion>
                  {postType === PostTypeEnum.PROJECT && (
                    <Accordion
                      title="Project Owner"
                      expandInitialState={!!editPostData?.projectOwner}
                    >
                      <AsyncSelect
                        styles={reactSelectStyle}
                        placeholder="Project Owner"
                        defaultValue={
                          editPostData?.projectOwner
                            ? ({
                                value: editPostData?.projectOwner?.id,
                                label: editPostData?.projectOwner?.email,
                              } as any)
                            : undefined
                        }
                        isClearable
                        isSearchable
                        cacheOptions
                        defaultOptions
                        name="projectOwnerId"
                        onChange={(newValue: any, actionMeta) => {
                          if (actionMeta.action === 'clear')
                            setFieldValue('status', PostStatusEnum.PUBLISH);
                          handleChange({
                            target: {
                              name: 'projectOwnerId',
                              value: newValue?.value ?? null,
                            },
                          });
                        }}
                        loadOptions={(inputValue) =>
                          projectOwnerOptionsLoader(inputValue, session) as any
                        }
                      />
                    </Accordion>
                  )}
                  {postType === PostTypeEnum.BLOG && (
                    <Accordion
                      title="Parent"
                      expandInitialState={!!editPostData?.parent}
                    >
                      <AsyncSelect
                        styles={reactSelectStyle}
                        placeholder="Parent"
                        defaultValue={
                          editPostData?.parent
                            ? ({
                                value: editPostData?.parent?.id,
                                label: editPostData?.parent?.title,
                              } as any)
                            : undefined
                        }
                        isClearable
                        isSearchable
                        cacheOptions
                        defaultOptions
                        name="parentId"
                        onChange={(newValue: any, actionMeta) => {
                          if (actionMeta.action === 'clear')
                            setFieldValue('status', PostStatusEnum.PUBLISH);
                          handleChange({
                            target: {
                              name: 'parentId',
                              value: newValue?.value ?? null,
                            },
                          });
                        }}
                        loadOptions={(inputValue) =>
                          parentOptionsLoader(inputValue, session) as any
                        }
                      />
                    </Accordion>
                  )}
                  {(postType === PostTypeEnum.BLOG ||
                    postType === PostTypeEnum.PROJECT) && (
                    <Accordion title="Categories" expandInitialState>
                      <AsyncSelect
                        components={animatedComponents}
                        styles={reactSelectStyle}
                        placeholder="Categories"
                        defaultValue={
                          getSelectFormattedTaxonomiesByType(
                            TaxonomyTypeEnum.CATEGORY
                          ) as any
                        }
                        isClearable
                        isSearchable
                        cacheOptions
                        defaultOptions
                        isMulti={true as any}
                        name="categoryIds"
                        onChange={(newValue: any, actionMeta) => {
                          handleChange({
                            target: {
                              name: 'categoryIds',
                              value: newValue?.map((i: any) => i.value),
                            },
                          });
                        }}
                        loadOptions={(inputValue) =>
                          categoriesOptionsLoader(inputValue, session) as any
                        }
                      />
                    </Accordion>
                  )}
                  {postType === PostTypeEnum.BLOG && (
                    <Accordion title="Tags" expandInitialState>
                      <AsyncSelect
                        components={animatedComponents}
                        styles={reactSelectStyle}
                        placeholder="Tags"
                        defaultValue={
                          getSelectFormattedTaxonomiesByType(
                            TaxonomyTypeEnum.TAG
                          ) as any
                        }
                        isClearable
                        isSearchable
                        cacheOptions
                        defaultOptions
                        isMulti={true as any}
                        name="tagIds"
                        onChange={(newValue: any, actionMeta) => {
                          console.log('after change: ', newValue);
                          handleChange({
                            target: {
                              name: 'tagIds',
                              value: newValue?.map((i: any) => i.value),
                            },
                          });
                        }}
                        loadOptions={(inputValue) =>
                          tagsOptionsLoader(inputValue, session) as any
                        }
                      />
                    </Accordion>
                  )}
                  <>
                    <Accordion
                      title="Featured Image"
                      expandInitialState={!!editPostData?.featuredImage}
                    >
                      <AsyncSelect
                        components={animatedComponents}
                        styles={reactSelectStyle}
                        placeholder="Featured Image"
                        defaultValue={
                          editPostData?.featuredImage
                            ? ({
                                value: editPostData?.featuredImage?.id,
                                label: (
                                  <AdminSelectMediaOptions
                                    {...editPostData.featuredImage}
                                    fileKey={editPostData.featuredImage.key}
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
                    </Accordion>
                    <Accordion
                      title="Attachments"
                      expandInitialState={!!editPostData?.attachments?.length}
                    >
                      <AsyncSelect
                        components={animatedComponents}
                        styles={reactSelectStyle}
                        placeholder="Attachments"
                        defaultValue={
                          editPostData?.attachments &&
                          editPostData?.attachments.length > 0
                            ? (editPostData.attachments.map((a) => ({
                                value: a.id,
                                label: (
                                  <AdminSelectMediaOptions
                                    {...a}
                                    fileKey={a.key}
                                  />
                                ),
                              })) as any)
                            : undefined
                        }
                        isClearable
                        isSearchable
                        cacheOptions
                        defaultOptions
                        isMulti={true as any}
                        name="attachmentsIds"
                        onChange={(newValue: any, actionMeta) => {
                          handleChange({
                            target: {
                              name: 'attachmentsIds',
                              value: newValue?.map((i: any) => i.value),
                            },
                          });
                        }}
                        loadOptions={(inputValue) =>
                          attachmentsOptionsLoader(inputValue, session) as any
                        }
                      />
                    </Accordion>
                    <Accordion
                      title="Excerpt"
                      expandInitialState={!!values.excerpt}
                    >
                      <div className="flex flex-col mt-4 w-full">
                        <textarea
                          name="excerpt"
                          className={`border-0 rounded-xl bg-zinc-100 w-full h-32 placeholder-zinc-400 text-xs sm:text-sm ${
                            errors.excerpt && touched.excerpt
                              ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                              : ' focus:border-2 focus:border-primary focus:bg-light'
                          }`}
                          value={values.excerpt}
                          maxLength={400}
                          placeholder="Excerpt..."
                          onBlur={handleBlur}
                          onChange={handleChange}
                        ></textarea>
                        {touched.excerpt && errors.excerpt && (
                          <div className="mt-2 text-danger text-xs">
                            {errors.excerpt}
                          </div>
                        )}
                      </div>
                    </Accordion>
                  </>
                  {!!editPostId && !!editPostData && (
                    <Accordion title="Slug History">
                      {values?.slugsHistory && (
                        <div className="flex flex-col justify-start items-start text-sm text-zinc-700 w-full text-left gap-4">
                          <div className="flex flex-row justify-start items-center text-xs">
                            <span className="text-zinc-700 font-semibold mr-1">
                              Slug History
                            </span>
                            <span className="text-dark">(Redirect 301):</span>
                          </div>
                          {values.slugsHistory.map((s, i) => (
                            <div
                              className="flex flex-row justify-start items-start w-full bg-zinc-100 p-2 rounded-lg"
                              key={i}
                            >
                              <div>{s.slug}</div>
                              <Button
                                rounded="rounded-md"
                                size="h-5"
                                type="button"
                                variant="danger"
                                extraCSSClasses="px-1.5 text-xs ml-auto"
                                onClick={() => {
                                  setValues({
                                    ...values,
                                    slugsHistory: values.slugsHistory.filter(
                                      (sh) => sh.id !== s.id
                                    ),
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-3 h-3"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </Accordion>
                  )}
                  {!!editPostId && !!editPostData && (
                    <Accordion title="Details">
                      <div className="flex flex-col justify-start items-start space-y-2">
                        {editPostData?.ancestor && (
                          <div className="flex flex-row justify-start items-center text-xs">
                            <div className="text-zinc-700 font-semibold">
                              Ancestor:
                            </div>
                            <div className="text-zinc-700 ml-2">
                              <Link
                                href={`/admin/posts/edit/${editPostData.ancestor.id}`}
                                className="underline text-primary"
                              >
                                {editPostData.ancestor.title}
                              </Link>
                            </div>
                          </div>
                        )}
                        {editPostData?.parent && (
                          <div className="flex flex-row justify-start items-center text-xs">
                            <div className="text-zinc-700 font-semibold">
                              Parent:
                            </div>
                            <div className="text-zinc-700 ml-2">
                              <Link
                                href={`/admin/posts/edit/${editPostData.parent.id}`}
                                className="underline text-primary"
                              >
                                {editPostData.parent.title}
                              </Link>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-row justify-start items-center text-xs">
                          <div className="text-zinc-700 font-semibold">
                            Created At:
                          </div>
                          <div className="text-zinc-700 ml-2">
                            {moment(editPostData.createdAt).format(
                              'MMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-center text-xs">
                          <div className="text-zinc-700 font-semibold">
                            Updated At:
                          </div>
                          <div className="text-zinc-700 ml-2">
                            {moment(editPostData.updatedAt).format(
                              'MMM Do YYYY, h:mm:ss a'
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-center text-xs">
                          <div className="text-zinc-700 font-semibold">
                            Created By:
                          </div>
                          <div className="text-zinc-700 ml-2">
                            <Link
                              href={`/admin/users/details/${editPostData.createdBy.id}`}
                              className="underline text-primary"
                            >
                              {editPostData.createdBy.firstName}
                            </Link>
                          </div>
                        </div>
                        {!!editPostData?.updatedBy && (
                          <div className="flex flex-row justify-start items-center text-xs">
                            <div className="text-zinc-700 font-semibold">
                              Updated By:
                            </div>
                            <div className="text-zinc-700 ml-2">
                              <Link
                                href={`/admin/users/details/${editPostData.updatedBy.id}`}
                                className="underline text-primary"
                              >
                                {editPostData.updatedBy.firstName}
                              </Link>
                            </div>
                          </div>
                        )}
                        <div className="flex flex-row justify-start items-center text-xs">
                          <div className="text-zinc-700 font-semibold">OS:</div>
                          <div className="text-zinc-700 ml-2">
                            {agentParser.getOS().name}
                          </div>
                        </div>
                        <div className="flex flex-row justify-start items-center text-xs">
                          <div className="text-zinc-700 font-semibold">
                            Browser:
                          </div>
                          <div className="text-zinc-700 ml-2">
                            {agentParser.getBrowser().name} -{' '}
                            {agentParser.getBrowser().version}
                          </div>
                        </div>
                      </div>
                    </Accordion>
                  )}
                </div>
              </div>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default AdminPostForm;
