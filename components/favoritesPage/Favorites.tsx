'use client';

import {
  useGetFavoritesQuery,
  useLazyGetFavoritesForCheckingQuery,
} from '@/store/favoriteFilmsQuery/favoriteMovies';
import { SectionWithCategory } from '@/globalComponents';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import React, { useEffect } from 'react';

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

  console.log(data);

  return (
    <SectionWithCategory
      externalData={{ films: data }}
      savedFavorites={savedData}
      categoryName="Фавориты"
      showFavoriteIcon={true}
      actionAfterFavoriteActin={actionAfterFavoriteActin}
    />
  );
};

export default Favorites;
