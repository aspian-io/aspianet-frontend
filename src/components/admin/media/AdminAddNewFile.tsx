import React, { useEffect, useState } from 'react';
import AdminCard from '../common/AdminCard';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import AwsS3Multipart from '@uppy/aws-s3-multipart';
import Webcam from '@uppy/webcam';
import ScreenCapture from '@uppy/screen-capture';
import ImageEditor from '@uppy/image-editor';
import Audio from '@uppy/audio';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import '@uppy/audio/dist/style.min.css';
import '@uppy/screen-capture/dist/style.min.css';
import {
  FileCreateFormValues,
  FileSectionEnum,
} from '../../../models/files/admin/file';
import { AdminFileAgent } from '../../../lib/axios/agent';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FilePolicyEnum } from '../../../models/files/file';

const AdminAddNewFile = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const companionUrl = `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}${process.env.NEXT_PUBLIC_COMPANION_PATH}`;
    const uppy = new Uppy()
      .use(Dashboard, {
        inline: true,
        target: `#media-uppy-dashboard`,
        width: '100%',
        proudlyDisplayPoweredByUppy: false,
        plugins: ['Webcam', 'ScreenCapture', 'ImageEditor', 'Audio'],
        metaFields: [
          { id: 'name', name: 'Filename', placeholder: 'Filename' },
          {
            id: 'imageAlt',
            name: 'Alt',
            placeholder: 'Enter the image alt here',
          },
        ],
      })
      .use(AwsS3Multipart, {
        limit: 4,
        companionUrl,
        companionHeaders: {
          'uppy-auth-token': session?.user.accessToken ?? '',
        },
      })
      .use(Webcam, { target: Dashboard })
      .use(Audio, { target: Dashboard })
      .use(ScreenCapture, { target: Dashboard })
      .use(ImageEditor, {
        target: Dashboard,
        quality: 0.8,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          responsive: true,
          croppedCanvasOptions: {},
        },
        actions: {
          revert: true,
          rotate: true,
          granularRotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: true,
          cropWidescreenVertical: true,
        },
      });

    uppy.setMeta({
      acl: FilePolicyEnum.PUBLIC_READ,
      section: FileSectionEnum.GENERAL,
    });

    uppy.on('upload-error', (file, error, response) => {
      if (error.message.includes('4002')) {
        return toast.error(
          `File type of '${file?.meta.name}' is not allowed.`,
          {
            className: 'bg-danger text-light',
          }
        );
      }

      return toast.error(
        `Something went wrong uploading '${file?.meta.name}', please try again later.`,
        {
          className: 'bg-danger text-light',
        }
      );
    });

    uppy.on('upload-success', async (file: any, response) => {
      console.log('Uploaded file info: ', {
        path: file.s3Multipart.key,
        policy: file.meta.acl,
        filename: file.meta.name,
        alt: file.meta.imageAlt,
        type: file.meta.type,
        size: file.size,
        section: file.meta.section,
        // Other information must be process and calculate in backend
      });

      try {
        setLoading(true);

        await AdminFileAgent.create(
          session,
          new FileCreateFormValues({
            key: file.s3Multipart.key,
            filename: file.meta.name,
            policy: FilePolicyEnum.PUBLIC_READ,
            section: file.meta.section,
            size: file.size,
            type: file.meta.type,
            imageAlt: file.meta.imageAlt,
          })
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          `Something went wrong saving ${file.meta.name} information, please try again.`,
          {
            className: 'bg-danger text-light',
          }
        );
      }
    });

    return () => uppy.close({ reason: 'unmount' });
  }, [session]);

  return (
    <AdminCard>
      {loading && (
        <div className="absolute z-[1006] inset-0 bg-primary/80 flex flex-col justify-center items-center text-light sm:text-3xl rounded-2xl">
          <div className="font-bold">Please wait!</div>
          <div className="animate-pulse">Saving uploaded file info...</div>
        </div>
      )}
      <div id="media-uppy-dashboard" className="w-full relative"></div>
    </AdminCard>
  );
};

export default AdminAddNewFile;
