import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { AdminSettingsAgent } from '../../../lib/axios/agent';
import { AdminSettingsKeys } from '../../../lib/swr/keys';
import { INestError } from '../../../models/common/error';
import { FilesWatermarkPlacementEnum } from '../../../models/files/admin/file';
import {
  ISettingsEntity,
  SettingsFormValues,
  SettingsKeyEnum,
  SettingsServiceEnum,
} from '../../../models/settings/settings';
import Button from '../../common/Button';
import FormikInput, { InputTypeEnum } from '../../common/FormikInput';
import Loading from '../../common/Loading';
import LoadingSpinner from '../../common/LoadingSpinner';
import AdminCard from '../common/AdminCard';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const AdminMediaSettings = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [watermarkSizes, setWatermarkSizes] = useState<string[]>([]);

  const fetcher = () =>
    AdminSettingsAgent.settingsList(session, SettingsServiceEnum.FILES);
  const {
    data: settingsData,
    error,
    mutate,
  } = useSWR<ISettingsEntity[], AxiosError<INestError>>(
    `${AdminSettingsKeys.GET_ALL_SETTINGS}?settingService=${SettingsServiceEnum.FILES}`,
    fetcher
  );

  useEffect(() => {
    if (settingsData) {
      const fileWaterMarkSizes = settingsData.filter(
        (s) => s.key === SettingsKeyEnum.FILE_WATERMARK_SIZES
      )[0];

      setWatermarkSizes(fileWaterMarkSizes?.value?.split(',') ?? []);
    }
  }, [settingsData]);

  if (error) router.push('/500');
  if (!settingsData) return <Loading />;

  const fileWatermarkSizesIncludes = (
    fileWatermarkSize: '480' | '640' | '800' | '1200' | '1600'
  ) => {
    const fileWaterMarkSizes = getSetting(
      SettingsKeyEnum.FILE_WATERMARK_SIZES
    )?.value;
    if (fileWaterMarkSizes) {
      const sizes = fileWaterMarkSizes.split(',');
      return sizes.includes(fileWatermarkSize);
    }
    return false;
  };

  function getSetting(key: SettingsKeyEnum) {
    return settingsData?.filter((s) => s.key === key)[0];
  }

  const initialValues = {
    FILE_WATERMARK_ACTIVE:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_ACTIVE)?.value ?? undefined,
    FILE_WATERMARK_IMAGE_ID:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_IMAGE_ID)?.value ?? undefined,
    FILE_WATERMARK_TO_IMAGE_DIMENSIONS:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_TO_IMAGE_DIMENSIONS)?.value ??
      undefined,
    FILE_WATERMARK_PLACEMENT:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_PLACEMENT)?.value ?? undefined,
    FILE_WATERMARK_MARGINS_TOP:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_MARGINS_TOP)?.value ??
      undefined,
    FILE_WATERMARK_MARGINS_RIGHT:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_MARGINS_RIGHT)?.value ??
      undefined,
    FILE_WATERMARK_MARGINS_BOTTOM:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_MARGINS_BOTTOM)?.value ??
      undefined,
    FILE_WATERMARK_MARGINS_LEFT:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_MARGINS_LEFT)?.value ??
      undefined,
    FILE_WATERMARK_OPACITY:
      getSetting(SettingsKeyEnum.FILE_WATERMARK_OPACITY)?.value ?? undefined,
    FILE_WATERMARK_SIZES_480: fileWatermarkSizesIncludes('480'),
    FILE_WATERMARK_SIZES_640: fileWatermarkSizesIncludes('640'),
    FILE_WATERMARK_SIZES_800: fileWatermarkSizesIncludes('800'),
    FILE_WATERMARK_SIZES_1200: fileWatermarkSizesIncludes('1200'),
    FILE_WATERMARK_SIZES_1600: fileWatermarkSizesIncludes('1600'),
  };

  const validationSchema = Yup.object({
    FILE_WATERMARK_ACTIVE: Yup.boolean(),
    FILE_WATERMARK_IMAGE_ID: Yup.string().max(
      50,
      'Image ID cannot be more than 50 characters'
    ),
    FILE_WATERMARK_TO_IMAGE_DIMENSIONS: Yup.number()
      .min(0.1, 'Minimum allowed number is 0.1')
      .max(0.9, 'Maximum allowed number is 0.9'),
    FILE_WATERMARK_PLACEMENT: Yup.string()
      .oneOf(Object.values(FilesWatermarkPlacementEnum))
      .required(),
    FILE_WATERMARK_MARGINS_TOP: Yup.number()
      .min(0, 'Minimum allowed number is 0')
      .max(5000, 'Maximum allowed number is 5000'),
    FILE_WATERMARK_MARGINS_RIGHT: Yup.number()
      .min(0, 'Minimum allowed number is 0')
      .max(5000, 'Maximum allowed number is 5000'),
    FILE_WATERMARK_MARGINS_BOTTOM: Yup.number()
      .min(0, 'Minimum allowed number is 0')
      .max(5000, 'Maximum allowed number is 5000'),
    FILE_WATERMARK_MARGINS_LEFT: Yup.number()
      .min(0, 'Minimum allowed number is 0')
      .max(5000, 'Maximum allowed number is 5000'),
    FILE_WATERMARK_OPACITY: Yup.number()
      .min(0, 'Minimum allowed number is 0')
      .max(100, 'Maximum allowed number is 100'),
    FILE_WATERMARK_SIZES_480: Yup.boolean(),
    FILE_WATERMARK_SIZES_640: Yup.boolean(),
    FILE_WATERMARK_SIZES_800: Yup.boolean(),
    FILE_WATERMARK_SIZES_1200: Yup.boolean(),
    FILE_WATERMARK_SIZES_1600: Yup.boolean(),
  });

  return (
    <AdminCard className="pb-8">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          if (values.FILE_WATERMARK_ACTIVE && !values.FILE_WATERMARK_IMAGE_ID) {
            toast.error('Image ID is required for watermark to be activated.', {
              className: 'bg-danger text-light',
            });
          }

          const settings = [
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_ACTIVE,
              value: values.FILE_WATERMARK_ACTIVE,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_IMAGE_ID,
              value: values.FILE_WATERMARK_IMAGE_ID,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_TO_IMAGE_DIMENSIONS,
              value: values.FILE_WATERMARK_TO_IMAGE_DIMENSIONS,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_PLACEMENT,
              value: values.FILE_WATERMARK_PLACEMENT,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_MARGINS_TOP,
              value: values.FILE_WATERMARK_MARGINS_TOP,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_MARGINS_RIGHT,
              value: values.FILE_WATERMARK_MARGINS_RIGHT,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_MARGINS_BOTTOM,
              value: values.FILE_WATERMARK_MARGINS_BOTTOM,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_MARGINS_LEFT,
              value: values.FILE_WATERMARK_MARGINS_LEFT,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_OPACITY,
              value: values.FILE_WATERMARK_OPACITY,
              service: SettingsServiceEnum.FILES,
            }),
            new SettingsFormValues({
              key: SettingsKeyEnum.FILE_WATERMARK_SIZES,
              value: watermarkSizes.join(','),
              service: SettingsServiceEnum.FILES,
            }),
          ];

          try {
            await AdminSettingsAgent.upsertSettings(session, settings);
            await mutate();
            resetForm();
            toast.success('File settings has been updated successfully.', {
              className: 'bg-success text-light',
            });
          } catch (error) {
            toast.error('Something went wrong.', {
              className: 'bg-danger text-light',
            });
          }
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          isValid,
          dirty,
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
        }) => (
          <Form>
            <fieldset
              disabled={isSubmitting}
              className="space-y-4 text-xs sm:text-sm"
            >
              <div className="flex flex-row justify-start items-start mb-10 mt-2">
                <Button
                  rounded="rounded-xl"
                  size="h-9"
                  type="submit"
                  variant="success"
                  extraCSSClasses="w-28 sm:w-36 ml-auto"
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
              <div className="flex justify-start items-start space-x-2">
                <input
                  id={SettingsKeyEnum.FILE_WATERMARK_ACTIVE}
                  type={InputTypeEnum.checkbox}
                  name={SettingsKeyEnum.FILE_WATERMARK_ACTIVE}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e) => {
                    e.target.checked
                      ? setFieldValue(
                          SettingsKeyEnum.FILE_WATERMARK_ACTIVE,
                          'true'
                        )
                      : setFieldValue(
                          SettingsKeyEnum.FILE_WATERMARK_ACTIVE,
                          'false'
                        );
                  }}
                  defaultChecked={values.FILE_WATERMARK_ACTIVE === 'true'}
                />
                <label
                  htmlFor={SettingsKeyEnum.FILE_WATERMARK_ACTIVE}
                  className="text-zinc-700"
                >
                  Activate image watermark.
                </label>
              </div>
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_IMAGE_ID}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Watermark Image ID"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_TO_IMAGE_DIMENSIONS}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Watermark Dimensions To Image (0.1 - 0.9)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <div className="flex flex-col w-72">
                <label
                  className={`self-start ${
                    touched[SettingsKeyEnum.FILE_WATERMARK_PLACEMENT] &&
                    errors[SettingsKeyEnum.FILE_WATERMARK_PLACEMENT]
                      ? 'text-danger'
                      : ''
                  } text-zinc-700 text-xs`}
                >
                  Watermark Placement:
                </label>
                <select
                  name={SettingsKeyEnum.FILE_WATERMARK_PLACEMENT}
                  className={`text-xs sm:text-sm h-9 bg-zinc-100 border-0 rounded-xl ${
                    !!values.FILE_WATERMARK_PLACEMENT
                      ? 'text-zinc-700'
                      : 'text-zinc-400'
                  } focus:text-zinc-700 focus:border-2 focus:border-primary focus:bg-light`}
                  value={values.FILE_WATERMARK_PLACEMENT}
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value={FilesWatermarkPlacementEnum.TOP_RIGHT}>
                    Top Right
                  </option>
                  <option value={FilesWatermarkPlacementEnum.TOP_CENTER}>
                    Top Center
                  </option>
                  <option value={FilesWatermarkPlacementEnum.TOP_LEFT}>
                    Top Left
                  </option>
                  <option value={FilesWatermarkPlacementEnum.MIDDLE}>
                    Middle
                  </option>
                  <option value={FilesWatermarkPlacementEnum.BOTTOM_RIGHT}>
                    Bottom Right
                  </option>
                  <option value={FilesWatermarkPlacementEnum.BOTTOM_CENTER}>
                    Bottom Center
                  </option>
                  <option value={FilesWatermarkPlacementEnum.BOTTOM_LEFT}>
                    Bottom Left
                  </option>
                </select>
              </div>

              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_MARGINS_TOP}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Top margin (px)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_MARGINS_RIGHT}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Right margin (px)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_MARGINS_BOTTOM}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Bottom margin (px)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_MARGINS_LEFT}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Left margin (px)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <Field
                type={InputTypeEnum.text}
                name={SettingsKeyEnum.FILE_WATERMARK_OPACITY}
                disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                placeholder="Watermark Opacity (0-100)"
                className="h-9 rounded-lg w-72 text-zinc-700 text-xs sm:text-sm"
                labelClassName="text-zinc-700"
                component={FormikInput}
              />
              <p className="text-zinc-700 text-xs my-4">
                Image Sizes To Watermark:
              </p>
              <div className="flex justify-start items-start space-x-2">
                <Field
                  id="FILE_WATERMARK_SIZES_480"
                  type={InputTypeEnum.checkbox}
                  name="FILE_WATERMARK_SIZES_480"
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e: any) => {
                    handleChange(e);
                    watermarkSizes.includes('480')
                      ? setWatermarkSizes((prev) =>
                          prev.filter((s) => s !== '480')
                        )
                      : setWatermarkSizes((prev) => [...prev, '480']);
                  }}
                  checked={watermarkSizes.includes('480')}
                />
                <label
                  htmlFor="FILE_WATERMARK_SIZES_480"
                  className="text-zinc-700"
                >
                  480px
                </label>
              </div>
              <div className="flex justify-start items-start space-x-2">
                <Field
                  id="FILE_WATERMARK_SIZES_640"
                  type={InputTypeEnum.checkbox}
                  name="FILE_WATERMARK_SIZES_640"
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e: any) => {
                    handleChange(e);
                    watermarkSizes.includes('640')
                      ? setWatermarkSizes((prev) =>
                          prev.filter((s) => s !== '640')
                        )
                      : setWatermarkSizes((prev) => [...prev, '640']);
                  }}
                  checked={watermarkSizes.includes('640')}
                />
                <label
                  htmlFor="FILE_WATERMARK_SIZES_640"
                  className="text-zinc-700"
                >
                  640px
                </label>
              </div>
              <div className="flex justify-start items-start space-x-2">
                <Field
                  id="FILE_WATERMARK_SIZES_800"
                  type={InputTypeEnum.checkbox}
                  name="FILE_WATERMARK_SIZES_800"
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e: any) => {
                    handleChange(e);
                    watermarkSizes.includes('800')
                      ? setWatermarkSizes((prev) =>
                          prev.filter((s) => s !== '800')
                        )
                      : setWatermarkSizes((prev) => [...prev, '800']);
                  }}
                  checked={watermarkSizes.includes('800')}
                />
                <label
                  htmlFor="FILE_WATERMARK_SIZES_800"
                  className="text-zinc-700"
                >
                  800px
                </label>
              </div>
              <div className="flex justify-start items-start space-x-2">
                <Field
                  id="FILE_WATERMARK_SIZES_1200"
                  type={InputTypeEnum.checkbox}
                  name="FILE_WATERMARK_SIZES_1200"
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e: any) => {
                    handleChange(e);
                    watermarkSizes.includes('1200')
                      ? setWatermarkSizes((prev) =>
                          prev.filter((s) => s !== '1200')
                        )
                      : setWatermarkSizes((prev) => [...prev, '1200']);
                  }}
                  checked={watermarkSizes.includes('1200')}
                />
                <label
                  htmlFor="FILE_WATERMARK_SIZES_1200"
                  className="text-zinc-700"
                >
                  1200px
                </label>
              </div>
              <div className="flex justify-start items-start space-x-2">
                <Field
                  id="FILE_WATERMARK_SIZES_1600"
                  type={InputTypeEnum.checkbox}
                  name="FILE_WATERMARK_SIZES_1600"
                  disabled={values.FILE_WATERMARK_ACTIVE !== 'true'}
                  className="w-4 h-4 text-primary bg-light rounded border-gray-300 focus:ring-0 focus:ring-offset-0 disabled:bg-zinc-300 disabled:hoverable:hover:bg-zinc-300 disabled:checked:bg-zinc-400"
                  onChange={(e: any) => {
                    handleChange(e);
                    watermarkSizes.includes('1600')
                      ? setWatermarkSizes((prev) =>
                          prev.filter((s) => s !== '1600')
                        )
                      : setWatermarkSizes((prev) => [...prev, '1600']);
                  }}
                  checked={watermarkSizes.includes('1600')}
                />
                <label
                  htmlFor="FILE_WATERMARK_SIZES_1600"
                  className="text-zinc-700"
                >
                  1600px
                </label>
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </AdminCard>
  );
};

export default AdminMediaSettings;
