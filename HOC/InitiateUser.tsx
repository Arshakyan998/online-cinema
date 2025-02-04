'use client';
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { useLazyGetUserQuery } from '@/store/auth/loginApi';
import { saveUser } from '@/store/user/userSlice';
import { getCookie } from 'cookies-next/client';
import { useAppDispatch } from '@/hooks';
import { Loading } from '@/components';

const InitiateUser = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, { data, error }] = useLazyGetUserQuery();

  const getData = async () => {
    const getAccessToken = getCookie('access_token');

    if (getAccessToken) {
      try {
        const user = await trigger(getAccessToken).unwrap();

        console.log(user);

        user && dispatch(saveUser(user));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(false);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  if (isLoading) return <Loading />;

  return children;
};
export default InitiateUser;
