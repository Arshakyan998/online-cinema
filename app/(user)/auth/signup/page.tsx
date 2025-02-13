import headerSlice from '@/store/header/headerSice';
import { SignUp } from '@/components';
import { NextPage } from 'next';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Вход в аккаунт',

    description: 'регистрируйся или заходи',
  };
}

const Page: NextPage = () => {
  // store.dispatch(headerSlice.actions.changeVisibility(true));

  return <SignUp />;
};

export default Page;
