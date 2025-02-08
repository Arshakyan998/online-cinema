import { NextPage, ResolvingMetadata } from 'next';
import { SearchParams } from '../Types';
import { Search } from '@/components';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(
  params: SearchParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Поиск фильма',

    description: 'Поиск вашего любимого филтма',
  };
}

const SearchPage: NextPage<SearchParams> = () => {
  return <Search />;
};

export default SearchPage;
