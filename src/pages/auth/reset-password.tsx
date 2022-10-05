import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { getCsrfToken, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { INestError } from '../../models/common/error';
import { toast } from 'react-toastify';
import { AuthAgent } from '../../lib/agent';
import Link from 'next/link';
import Button from '../../components/common/Button';
import Input, { InputTypeEnum } from '../../components/common/Input';
import Image from 'next/image';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  IUserResetPasswordOtp,
  UserResetPasswordOtp,
} from '../../models/users/otp';
import FormikInput from '../../components/common/FormikInput';
import { useTimer } from '../../hooks/common/useTimer';
import ResetPassword from '../../components/site/auth/ResetPassword';

interface IProps {
  email: string;
  remainingTime: number;
}

const ResetPasswordPage: NextPage<IProps> = ({ email, remainingTime }) => {
  return <ResetPassword email={email} remainingTime={remainingTime} />;
};

export default ResetPasswordPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query['email']) throw new Error('Email must be supplied');

  try {
    const remainingTimeObj = await AuthAgent.resetPasswordRemainingTime(
      context.query['email'] as string
    );

    return {
      props: {
        email: context.query['email'],
        remainingTime: remainingTimeObj.remainingTimeInSec,
      },
    };
  } catch (error) {
    const err = error as AxiosError<INestError>;
    if (
      err.response?.data.statusCode === 403 ||
      err.response?.data.statusCode === 400
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    throw new Error('Something went wrong');
  }
};
