'use client';
import { useLazyGetFilmByNameQuery } from '@/store/filmBySymbolQuery/filmByKeyword';
import { useLazyGetByGenreQuery } from '@/store/filmsQuery/trendsMovieApi';
import SectionWithCategory from '../../shared/SectionWithCategory';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import Pagination from '../../shared/Pagination';
import Loading from '../../shared/Loading';
import { useAppSelector } from '@/hooks';

const Search = () => {
  const searchParams = useSearchParams();
  const [fetchData, { data: DataByGenres, isLoading, error }] =
    useLazyGetByGenreQuery();

  const genres = useAppSelector(data => data['geners/data'].genres);

  const [
    getFilmByKeyWord,
    { data: DataByKeyword, isLoading: DataByKeywordLoad, error: dataError },
  ] = useLazyGetFilmByNameQuery();

  const getGenres = useMemo(() => {
    const genresParam = searchParams.get('genres');
    return genresParam ? genresParam.split(',') : [];
  }, [searchParams]);

  const getMoviesName = searchParams.get('moviesName');
  useEffect(() => {
    if (getMoviesName) {
      getFilmByKeyWord({ keyword: getMoviesName }, false);
    } else if (getGenres.length) {
      fetchData({ genres: getGenres }, false);
    }
  }, [getMoviesName, getGenres]);

  if (isLoading || DataByKeywordLoad) return <Loading />;
  if (error) return <div>Err</div>;

  const pageChange = (page: number) => {
    if (getMoviesName) {
      // getFilmByKeyWord({ keyword: getMoviesName, page });
    } else if (getGenres.length) {
      fetchData({ genres: getGenres, page });
    }

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
