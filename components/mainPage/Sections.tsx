'use client';
import { useLazyGetFavoritesForCheckingQuery } from '@/store/favoriteFilmsQuery/favoriteMovies';
import { SectionWithCategory } from '@/globalComponents';
import { useAppSelector } from '@/hooks';
import React, { useEffect } from 'react';

const Sections: React.FC = () => {
  const userId = useAppSelector(state => state['user/data'].user.id);

  const [trigger, { data }] = useLazyGetFavoritesForCheckingQuery();

  useEffect(() => {
    if (userId) trigger(userId);
  }, [userId]);

  const actionAfterFavoriteActin = () => {
    if (userId) trigger(userId);
  };

  return (
    <>
      <SectionWithCategory
        sliderOn
        withAnimation
        categoryName="В Тренде"
        requestType="trades"
        savedFavorites={data}
        actionAfterFavoriteActin={actionAfterFavoriteActin}
      />
      <SectionWithCategory
        categoryName="Лучше за все время"
        withAnimation
        requestType="bestAllTime"
        savedFavorites={data}
        actionAfterFavoriteActin={actionAfterFavoriteActin}
      />
    </>
  );
};

export default Sections;
