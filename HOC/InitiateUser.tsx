'use client';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { useLazyGetUserQuery } from '@/store/auth/loginApi';
import { saveUser } from '@/store/user/userSlice';
import { getCookie } from 'cookies-next/client';
import { useAppDispatch } from '@/hooks';
import Helper from '@/utils/Helper';
import { Loading } from '@/shared';

const InitiateUser = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [trigger, { data, isError }] = useLazyGetUserQuery();

  const getData = useCallback(async () => {
    const getAccessToken = getCookie('access_token');

    if (getAccessToken) {
      const user = await trigger(getAccessToken).unwrap();
      user && dispatch(saveUser(user));
      Helper.updateTokens(user.tokens);
    } else {
      setIsLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isError || data) setIsLoading(false);
  }, [data, isError]);

  if (isLoading) return <Loading />;

  return children;
};
export default InitiateUser;
