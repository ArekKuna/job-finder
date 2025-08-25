import { useCallback, useEffect, useRef } from 'react';

import { useAtom } from 'jotai';
import Cookies from 'js-cookie';

import { UserAuthenticationResponseDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomQuery } from 'hooks/useCustomQuery/useCustomQuery';

const AUTHORIZE_URL = 'auth/authorize';

export const useCheckAuthStatus = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);
  const hasRun = useRef(false);

  const token = Cookies.get('JWT');

  const { refetch } = useCustomQuery<UserAuthenticationResponseDto>(AUTHORIZE_URL, Boolean(token), [
    'authStatus',
  ]);

  const authorizeUser = useCallback(async () => {
    hasRun.current = true;
    const { data } = await refetch();
    setAuthStatus(data ? 'AUTHORIZED' : 'UNAUTHORIZED');
  }, [refetch, setAuthStatus]);

  useEffect(() => {
    if (!hasRun.current) {
      authorizeUser();
    }
  }, [authorizeUser]);
};

export const useLogout = () => {
  const [, setAuthorizationStatus] = useAtom(authStatusAtom);

  const logout = () => {
    Cookies.remove('JWT');
    setAuthorizationStatus('UNAUTHORIZED');
  };

  return logout;
};
