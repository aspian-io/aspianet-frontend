import { Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CommentAgent } from '../../../../lib/axios/agent';
import {
  CommentFormValues,
  IComment,
} from '../../../../models/comments/comment';
import Button from '../../../common/Button';
import LoadingSpinner from '../../../common/LoadingSpinner';

interface IProps {
  postId: string;
  parentId?: string;
  placeholder?: string;
  submitBtnText?: string;
  onSuccess?: (comment: IComment) => any;
}

const CommentForm: FC<IProps> = ({
  postId,
  parentId,
  placeholder = 'Leave your comment here...',
  submitBtnText = 'Add Comment',
  onSuccess = () => {},
}) => {
  const { data: session } = useSession();
  const [charLeft, setCharLeft] = useState(800);

  const validationSchema = Yup.object({
    content: Yup.string().max(
      800,
      'Comment length must be less than 800 characters'
    ),
  });

  return (
    <Formik
      initialValues={new CommentFormValues()}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const comment = await CommentAgent.create(
            session,
            new CommentFormValues({
              content: values.content,
              postId,
              parentId,
            })
          );

          resetForm();

          await onSuccess(comment);

          toast.success(
            'The comment has been sent successfully and will be displayed after approval.',
            {
              className: 'bg-success text-light',
            }
          );
        } catch (error) {
          toast.error('Something went wrong, please try again later.', {
            className: 'bg-danger text-light',
          });
        }
      }}
    >
      {({
        isSubmitting,
        isValid,
        dirty,
        handleBlur,
        handleChange,
        touched,
        errors,
        values,
      }) => (
        <Form className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col w-full">
            <textarea
              name="content"
              className={`border-2 border-primary rounded-xl bg-zinc-100 w-full h-44 placeholder-zinc-400 text-xs sm:text-sm ${
                errors.content && touched.content
                  ? 'focus:border-2 focus:ring-0 border-danger-light bg-danger-light/10 focus:border-danger focus:bg-danger-light/10'
                  : ' focus:border-2 focus:border-primary focus:bg-light'
              }`}
              maxLength={800}
              value={values.content?.length ? values.content : ''}
              placeholder={placeholder}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setCharLeft(800 - e.target.value.length);
              }}
            ></textarea>
            {charLeft > 1 && (
              <div className="mt-2 text-zinc-400 text-xs self-start">
                {charLeft} characters left.
              </div>
            )}
            {charLeft === 1 && (
              <div className="mt-2 text-zinc-400 text-xs self-start">
                {charLeft} character left.
              </div>
            )}
            {charLeft === 0 && (
              <div className="mt-2 text-zinc-400 text-xs self-start">
                No characters left.
              </div>
            )}
            {touched.content && errors.content && (
              <div className="mt-2 text-danger text-xs">{errors.content}</div>
            )}
          </div>
          <Button
            rounded="rounded-xl"
            size="h-12"
            type="submit"
            variant="primary"
            block
            disabled={!(isValid && dirty) || isSubmitting}
            extraCSSClasses="mt-4 flex justify-center items-center"
          >
            {isSubmitting ? (
              <LoadingSpinner className="w-6 h-6" />
            ) : (
              submitBtnText
            )}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
