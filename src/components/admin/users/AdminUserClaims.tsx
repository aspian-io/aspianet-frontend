import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { AdminUserAgent } from '../../../lib/axios/agent';
import { AdminUserKeys } from '../../../lib/swr/keys';
import { ClaimsEnum, IClaimEntity } from '../../../models/auth/common';
import { INestError } from '../../../models/common/error';
import { IUserEntity } from '../../../models/users/admin/user';
import Button from '../../common/Button';
import { InputTypeEnum } from '../../common/FormikInput';
import Loading from '../../common/Loading';
import LoadingSpinner from '../../common/LoadingSpinner';
import AdminCard from '../common/AdminCard';

const AdminUserClaims = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const id = router.query.id as string;

  const userDetailsFetcher = () => AdminUserAgent.details(session, id);
  const claimsFetcher = () => AdminUserAgent.claimsList(session);

  const {
    data: userData,
    error: userFetchError,
    mutate,
  } = useSWR<IUserEntity, AxiosError<INestError>>(
    `${AdminUserKeys.GET_USER_DETAILS}/${id}`,
    userDetailsFetcher
  );
  const { data: claimsData, error: claimsFetchError } = useSWR<
    IClaimEntity[],
    AxiosError<INestError>
  >(AdminUserKeys.GET_ALL_CLAIMS, claimsFetcher);

  if (userFetchError || claimsFetchError) router.push('/500');
  if (!userData || !claimsData) return <Loading />;

  const isClaimsForCurrentUser = session?.user.id === id;
  const userClaimsIds = userData.claims.map((uc) => uc.id);
  const initialValues: { claimIds: string[] } = { claimIds: userClaimsIds };

  function getClaimIdByName(claimName: ClaimsEnum) {
    const claim = claimsData?.filter((c) => c.name === claimName)[0];
    return claim?.id;
  }

  return (
    <div className="flex justify-center items-center pb-4 space-y-4">
      <AdminCard className="w-full">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            try {
              await AdminUserAgent.editUserClaims(session, id, values.claimIds);
              toast.success(
                "The user's claims has been updated successfully.",
                {
                  className: 'bg-success text-light',
                }
              );
              await mutate();
            } catch (error) {
              const err = error as AxiosError<INestError>;
              if (err.response?.data.error === 'SELF_CLAIM_EDIT_ERR') {
                return toast.error('You cannot change your own claims.', {
                  className: 'bg-danger text-light',
                });
              }

              toast.error('Something went wrong, please try again later.', {
                className: 'bg-danger text-light',
              });
            }
          }}
        >
          {({ isSubmitting, values, isValid, dirty }) => (
            <Form>
              <fieldset disabled={isSubmitting || isClaimsForCurrentUser}>
                <div className="flex flex-row justify-start items-start mb-10 mt-2">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col justify-center items-start">
                      <h4 className="font-bold text-primary text-sm sm:text-base underline">
                        User Claims Info:
                      </h4>
                      <div className="text-sm text-zinc-400">
                        {!isClaimsForCurrentUser ? (
                          <div className="text-xs max-w-[120px] sm:max-w-fit text-ellipsis overflow-hidden">
                            test3test3444@gmail.com
                          </div>
                        ) : (
                          <div className="text-danger text-xs">
                            You cannot edit your own claims!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    rounded="rounded-xl"
                    size="h-9"
                    type="submit"
                    variant="success"
                    extraCSSClasses="w-28 sm:w-36 text-xs sm:text-sm ml-auto"
                    disabled={!(isValid && dirty)}
                  >
                    {isSubmitting ? (
                      <div className="flex justify-center items-center">
                        <LoadingSpinner className="h-6 w-6 text-light" />
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
                <div className="flex flex-col justify-center items-start w-full lg:w-1/3 mt-8">
                  <h5 className="font-bold text-danger text-sm mb-2">
                    Super User Claim:
                  </h5>
                  <div className="flex justify-start items-center space-x-2">
                    <Field
                      id={ClaimsEnum.ADMIN}
                      type={InputTypeEnum.checkbox}
                      name="claimIds"
                      value={getClaimIdByName(ClaimsEnum.ADMIN)}
                      className="w-4 h-4 text-danger bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      disabled={
                        values.claimIds.length > 0 &&
                        !values.claimIds.includes(
                          getClaimIdByName(ClaimsEnum.ADMIN)!
                        )
                      }
                    />
                    <label
                      htmlFor={ClaimsEnum.ADMIN}
                      className="text-sm text-zinc-700"
                    >
                      Admin (Access All)
                    </label>
                  </div>
                </div>
                <fieldset
                  disabled={values.claimIds.includes(
                    getClaimIdByName(ClaimsEnum.ADMIN)!
                  )}
                  className="flex flex-col md:flex-row w-full flex-wrap mb-6"
                >
                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      User Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.USER_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.USER_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.USER_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read users information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.USER_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.USER_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.USER_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to create users.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.USER_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.USER_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.USER_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit users.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.USER_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.USER_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.USER_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete users.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Settings Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.SETTING_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.SETTING_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.SETTING_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read settings information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.SETTING_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.SETTING_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.SETTING_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit settings.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      File Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.FILE_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.FILE_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.FILE_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read files.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.FILE_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.FILE_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.FILE_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to upload files.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.FILE_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.FILE_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.FILE_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit files information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.FILE_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.FILE_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.FILE_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete files.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Taxonomy Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.TAXONOMY_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.TAXONOMY_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.TAXONOMY_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read taxonomies information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.TAXONOMY_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.TAXONOMY_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.TAXONOMY_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to create taxonomies.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.TAXONOMY_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.TAXONOMY_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.TAXONOMY_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit taxonomies.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.TAXONOMY_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.TAXONOMY_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.TAXONOMY_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete taxonomies.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Post Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.POST_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.POST_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.POST_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read posts information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.POST_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.POST_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.POST_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to create posts.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.POST_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.POST_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.POST_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit posts.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.POST_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.POST_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.POST_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete posts.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Comment Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.COMMENT_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.COMMENT_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.COMMENT_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read comments and their information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.COMMENT_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.COMMENT_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.COMMENT_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to add comments.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.COMMENT_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.COMMENT_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.COMMENT_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit comments.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.COMMENT_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.COMMENT_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.COMMENT_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete comments.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Newsletter Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.NEWSLETTER_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.NEWSLETTER_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.NEWSLETTER_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read newsletter information.
                      </label>
                    </div>
                    <div className="flex justify-start items-start space-x-2">
                      <Field
                        id={ClaimsEnum.NEWSLETTER_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.NEWSLETTER_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.NEWSLETTER_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to create related things to the newsletter
                        section (e.g. Campaigns etc.)
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.NEWSLETTER_EDIT}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.NEWSLETTER_EDIT)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.NEWSLETTER_EDIT}
                        className="text-sm text-zinc-700"
                      >
                        Ability to edit newsletter information.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.NEWSLETTER_DELETE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.NEWSLETTER_DELETE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.NEWSLETTER_DELETE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to delete newsletter campaigns, subscribers etc.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm mb-2">
                      Email Section Claims:
                    </h5>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.EMAIL_SEND}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.EMAIL_SEND)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.EMAIL_SEND}
                        className="text-sm text-zinc-700"
                      >
                        Ability to send emails.
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-start max-w-[230px] sm:max-w-full md:w-1/2 xl:w-1/3 mt-8 md:pr-10">
                    <h5 className="font-bold text-primary text-sm">
                      SMS Section Claims:
                    </h5>
                    <div className="text-zinc-400 text-xs mb-2">
                      Only if supported
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.SMS_READ}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.SMS_READ)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.SMS_READ}
                        className="text-sm text-zinc-700"
                      >
                        Ability to read SMS.
                      </label>
                    </div>
                    <div className="flex justify-start items-center space-x-2">
                      <Field
                        id={ClaimsEnum.SMS_CREATE}
                        type={InputTypeEnum.checkbox}
                        name="claimIds"
                        value={getClaimIdByName(ClaimsEnum.SMS_CREATE)}
                        className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                      />
                      <label
                        htmlFor={ClaimsEnum.SMS_CREATE}
                        className="text-sm text-zinc-700"
                      >
                        Ability to send SMS.
                      </label>
                    </div>
                  </div>
                </fieldset>
              </fieldset>
            </Form>
          )}
        </Formik>
      </AdminCard>
    </div>
  );
};

export default AdminUserClaims;
