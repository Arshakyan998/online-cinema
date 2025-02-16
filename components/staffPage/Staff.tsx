'use client';

import { useGetActorQuery } from '@/store/actorsQuery/api';
import { Loading, SectionWithCategory } from '@/shared';
import { IFilms } from '@/GlobalTypes/Film';
import { useParams } from 'next/navigation';
import React from 'react';

const Staff = () => {
  const getActorData = useParams().staffId! as string;
  const { data, isLoading } = useGetActorQuery(getActorData);

  if (isLoading) return <Loading />;

  return (
    <SectionWithCategory
      withAnimation
      externalData={{ films: data!.films, total: 0, totalPages: 0 }} categoryName={''}    />
  );
};

export default Staff;
