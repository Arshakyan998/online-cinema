'use client';

import {
  useGetFavoritesQuery,
  useLazyGetFavoritesForCheckingQuery,
} from '@/store/favoriteFilmsQuery/favoriteMovies';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { SectionWithCategory } from '@/shared';
import { useAppSelector } from '@/hooks';
import { IData } from '@/GlobalTypes/Film';

const Favorites: React.FC = () => {
  const userId = useAppSelector(state => state['user/data'].user.id);
  const params = useParams();

  const { data, refetch } = useGetFavoritesQuery(params.id as string, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [trigger, { data: savedData }] = useLazyGetFavoritesForCheckingQuery();

  useEffect(() => {
    if (userId) trigger(userId);
  }, [userId]);

  const actionAfterFavoriteActin = () => {
    refetch();
  };

  if (params.id !== userId) {
    return null;
  }

  return (
    <SectionWithCategory
      externalData={{ films: data || [] } as IData<'films'>}
      savedFavorites={savedData}
      categoryName="Фавориты"
      showFavoriteIcon={true}
      actionAfterFavoriteActin={actionAfterFavoriteActin}
    />
  );
};

export default Favorites;
