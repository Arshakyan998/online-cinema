import type { IActor, IFilm } from '@/store/filmBySymbolQuery/type';
import SectionWithCategory from '../SectionWithCategory';
import Category from '@/UIkit/Category';
import { IData } from '@/store/types';
import Helper from '@/utils/Helper';
import { Tag } from '@/UIkit';
import { Rate } from 'antd';
import React from 'react';

const Description: React.FC<
  IFilm & {
    staff: Record<string, IActor[]>;
    PrequelsAndSequels?: IData<'films'>;
    similarMovies?: IData<'films'>;
  }
> = ({
  ratingKinopoiskVoteCount,
  ratingKinopoisk,
  ratingImdb,
  description,
  countries,
  ratingAgeLimits,
  type,
  nameRu,
  year,
  filmLength,
  lastSync,
  genres,
  staff,
  PrequelsAndSequels,
  similarMovies,
}) => {
  const rating = (ratingImdb + ratingKinopoisk) / 2;

  const hours = Math.trunc(filmLength / 60);
  const minutes = Math.trunc(filmLength % 60);

  const duration = `${hours}:${minutes}`;

  const infoAbout = [
    {
      title: 'Тип',
      description: type,
    },
    {
      title: 'Дата выхода',
      description: new Date(lastSync).toLocaleDateString(),
    },
    {
      title: 'Страна',
      description: countries.map(el => el.country + ' ').join(''),
    },
    {
      title: 'Продолжительность',
      description: duration,
    },
  ];

  return (
    <section className="py-10 flex flex-col">
      <div className="flex justify-between">
        <div className="columns-xl-8 mb-24">
          <div className=" mb-24 flex items-center">
            <h2 className="text-3xl font-bold text-white">{nameRu}</h2>
            <div className="rating flex items-center mt-2">
              <span className="text-lg text-white  mx-2">
                <Rate
                  value={rating}
                  disabled
                  className="flex flex-row"
                  count={10}
                />
              </span>
              <span className="text-lg text-white ml-2">
                ({ratingKinopoiskVoteCount}) голосов
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {[`${ratingAgeLimits?.slice(3)}+`, type, year, duration].map(el => (
              <Tag key={el}> {el}</Tag>
            ))}
          </div>
          <h5 className="h-6 color-white mb-4 text-2xl"> Про фильм</h5>
          <p className="color-white mb-6 text-base max-w-3xl">{description}</p>

          {Object.keys(staff).map((el: string) => {
            const fullStaff = staff[el].slice(0, 10);

            return (
              <p className="color-white mb-6 text-base" key={el}>
                <span className="color-medium-gray text-base font-semibold">
                  {fullStaff[0]?.professionText}։{' '}
                  {Helper.addVirgule(fullStaff, 'nameRu', 'span')}
                </span>
              </p>
            );
          })}
        </div>
        <div className="columns-xl-8 columns-x mb-24 justify-start">
          <div className="box-border">
            <h3 className="text-3xl mb-24">Пол фильм</h3>
            {infoAbout.map(({ description, title }) => {
              return (
                <p className="color-white mb-6 text-base" key={title}>
                  <span className="text-medium-gray  font-bold text-base  ">
                    {title} :
                  </span>{' '}
                  {description}
                </p>
              );
            })}

            <div className="py-4 px-0 border-border-color border border-solid border-l-0 border-r-0 items-start gap-5 flex ">
              <p className="text-medium-gray text-lg mb-6 font-bold ">Genre:</p>
              <Category category={genres.map(el => el.genre)} />
            </div>
          </div>
        </div>
      </div>
      {!!PrequelsAndSequels?.films.length && (
        <SectionWithCategory
          categoryName="Приквелы и сиквелы"
          withAnimation
          sliderOn={PrequelsAndSequels?.films.length > 1}
          externalData={PrequelsAndSequels}
        />
      )}

      {!!similarMovies?.films.length && (
        <SectionWithCategory
          categoryName="Похожие"
          withAnimation
          sliderOn={similarMovies?.films.length > 1}
          externalData={similarMovies}
        />
      )}
    </section>
  );
};

export default Description;
