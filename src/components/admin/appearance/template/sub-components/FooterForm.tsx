import { Form, Formik } from 'formik';
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
import TinyMce from '../../../common/text-editor/TinyMce';
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

const FooterForm = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full">
      <div className="p-4 bg-light rounded-2xl w-full space-y-4">
        <Accordion
          title="Contact Widget"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor
            type={WidgetTypeEnum.CONTACT_WIDGET}
            order={0}
          />
        </Accordion>
        <Accordion
          title="Links Widget"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor type={WidgetTypeEnum.LINKS_WIDGET} order={1} />
        </Accordion>
        <Accordion
          title="Newsletter Widget"
          bodyClassName="flex justify-center items-center"
        >
          <SegmentContentEditor
            type={WidgetTypeEnum.NEWSLETTER_WIDGET}
            order={2}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default FooterForm;

interface ISegmentContentEditorProps {
  type: WidgetTypeEnum;
  order: number;
}

const SegmentContentEditor: FC<ISegmentContentEditorProps> = ({ type }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const fetcher = () => AdminPostAgent.getWidgetsByType(session, type);

  const {
    data: footerWidgetData,
    error,
    mutate,
  } = useSWR<IPostEntity[], AxiosError<INestError>>(
    `${AdminPostKeys.GET_WIDGETS_LIST}?type=${type}`,
    fetcher
  );

  if (!footerWidgetData)
    return <LoadingSpinner className="text-primary w-9 h-9 my-20" />;
  if (error) router.push('/500');

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

  return (
    <Formik
      initialValues={new PostFormValues(footerWidgetData[0])}
      onSubmit={async (values) => {
        const post = new PostFormValues(values);
        post.title = WidgetTypeEnum[type];
        post.slug = WidgetTypeEnum[type].replace('_', '-').toLowerCase();
        post.type = WidgetTypeEnum[type];

        try {
          if (footerWidgetData[0]) {
            await AdminPostAgent.edit(session, footerWidgetData[0].id, post);
            toast.success(
              `The modification operation was completed successfully`,
              {
                className: 'bg-success text-light',
              }
            );
          } else {
            await AdminPostAgent.create(session, post);

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
      {({ isSubmitting, handleChange, dirty }) => (
        <Form>
          <div>
            <TinyMce
              style="border-radius: 12px"
              height={500}
              content={footerWidgetData[0]?.content ?? ''}
              onEditorChange={(content) =>
                handleChange({
                  target: { name: 'content', value: content },
                })
              }
            />
          </div>
          <div className="w-full flex justify-center items-center mt-4">
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
