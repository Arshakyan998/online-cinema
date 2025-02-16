import { Metadata, NextPage, ResolvingMetadata } from 'next';
import actorsApi from '@/store/actorsQuery/api';
import { SearchParams } from '@/app/Types';
import { store } from '@/store/store';
import { Staff } from '@/components';
import React from 'react';

export async function generateMetadata(
  { params }: SearchParams<'staffId'>,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).staffId;

  const { data } = await store.dispatch(
    actorsApi.endpoints.getActor.initiate(id),
  );

  const previousImages = (await parent).title?.absolute || '';

  return {
    title: `Актер | ${previousImages} | ${data?.nameRu || data?.nameEn}`,
    openGraph: {
      images: [data?.posterUrl!],
      description: `Информация и фильмы ${data?.profession}а ${data?.nameRu}`,
    },
  };
}

const StaffPage = () => {
  return <Staff />;
};

export default StaffPage;
