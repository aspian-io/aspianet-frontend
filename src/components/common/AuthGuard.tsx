import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ClaimsEnum } from '../../models/users/common';
import Loading from './Loading';
import jwt from 'jsonwebtoken';
import { IJwt } from './types/jwt';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

interface IProps {
  claims: ClaimsEnum[];
}

export const AuthGuard: FC<PropsWithChildren<IProps>> = ({
  claims,
  children,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userClaims, setUserClaims] = useState<string[]>([]);
  useMemo(() => {
    if (status === 'authenticated') {
      setUserClaims((jwt.decode(session.user.accessToken) as IJwt).clms);
    } else {
      setUserClaims([]);
    }
  }, [session?.user.accessToken, status]);

  useEffect(() => {
    if (status === 'unauthenticated') signIn();
    if (
      status === 'authenticated' &&
      !claims?.some((c) => userClaims?.includes(c))
    )
      router.push('/403');
  }, [claims, router, status, userClaims]);

  if (status === 'loading')
    return (
      <>
        <Loading />
      </>
    );

  if (!claims?.length && status === 'authenticated') return <>{children}</>;

  if (userClaims?.length && claims?.some((c) => userClaims.includes(c))) {
    return <>{children}</>;
  }

  return null;
};