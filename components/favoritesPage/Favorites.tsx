'use client';

import { useGetFavoritesQuery } from '@/store/favoriteFilmsQuery/getFavoriteMovies';
import { SectionWithCategory } from '@/globalComponents';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import { Typography } from 'antd';
import React from 'react';

const Favorites: React.FC = () => {
  const useId = useAppSelector(state => state['user/data'].user.id);
  const params = useParams();

  const { data } = useGetFavoritesQuery(params.id as string);

  if (params.id !== useId) {
    return null;
  }

  // return <SectionWithCategory categoryName="Фавориты" />;
  return <Typography> Фавориты</Typography>;
};

export default Favorites;
