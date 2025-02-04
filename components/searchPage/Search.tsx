'use client';
import { useLazyGetFilmByNameQuery } from '@/store/filmBySymbolQuery/filmByKeyword';
import { useLazyGetByGenreQuery } from '@/store/filmsQuery/trendsMovieApi';
import SectionWithCategory from '../../globalComponents/SectionWithCategory';
import { useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/hooks';
import React, { useEffect } from 'react';
import Pagination from '../../globalComponents/Pagination';
import Loading from '../../globalComponents/Loading';

const Search = () => {
  const searchParams = useSearchParams();
  const [fetchData, { data: DataByGenres, isLoading, error }] =
    useLazyGetByGenreQuery();

  const genres = useAppSelector(data => data['geners/data'].genres);

  const [
    getFilmByKeyWord,
    { data: DataByKeyword, isLoading: DataByKeywordLoad, error: dataError },
  ] = useLazyGetFilmByNameQuery();
  const getGenres = (searchParams.get('genres') as string)?.split(',');
  const getMoviesName = searchParams.get('moviesName');

  useEffect(() => {
    if (getGenres?.length) {
      fetchData({
        genres: getGenres,
      });
    }

    if (getMoviesName?.length) {
      getFilmByKeyWord({ keyword: getMoviesName });
    }
  }, [searchParams]);

  if (isLoading) return <Loading />;
  if (error) return <div>Err</div>;

  const pageChange = (page: number) => {
    fetchData({
      genres: getGenres,
      page,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const data = DataByGenres || DataByKeyword;

  const description = genres.length
    ? `${genres.map(el => el.genre).join(', ')}.`
    : getMoviesName;

  return (
    <div className="flex flex-col">
      <SectionWithCategory
        categoryName={`Поиск: ${data?.films.length ? description : `по запросу ${description} не найден`} `}
        externalData={data || { films: [], total: 0, totalPages: 0 }}
        withAnimation
      />
      {!!(data?.films?.length && data?.films.length !== data?.total) && (
        <Pagination
          total={data.total || 0}
          pageCount={data.films.length || 0}
          onChange={pageChange}
        />
      )}
    </div>
  );
};

export default Search;
