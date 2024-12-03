import type { IActor, IFilm } from "@/store/filmByIdQuery/type";
import Category from "@/UIkit/Category";
import Tags from "@/UIkit/Tags";
import { Helper } from "@/utils/Helper";
import { Rate } from "antd";
import React from "react";

const Description: React.FC<IFilm & { staff: Record<string, IActor[]> }> = ({
  nameRu,
  ratingKinopoiskVoteCount,
  ratingKinopoisk,
  ratingImdb,
  description,
  countries,
  ratingAgeLimits,
  type,
  year,
  filmLength,
  lastSync,
  genres,
  staff,
}) => {
  const rating = (ratingImdb + ratingKinopoisk) / 2;

  const hours = Math.trunc(filmLength / 60);
  const minutes = Math.trunc(filmLength % 60);

  const duration = `${hours}:${minutes}`;

  const infoAbout = [
    {
      title: "Тип",
      description: type,
    },
    {
      title: "Дата выхода",
      description: new Date(lastSync).toLocaleDateString(),
    },
    {
      title: "Страна",
      description: countries.map((el) => el.country + " ").join(""),
    },
    {
      title: "Продолжительность",
      description: duration,
    },
  ];

  return (
    <section className="py-10 flex justify-evenly">
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
        <Tags tags={[`${ratingAgeLimits?.slice(3)}+`, type, year, duration]} />

        <h5 className="h-6 color-white mb-4 text-2xl"> Про фильм</h5>
        <p className="color-white mb-6 text-base max-w-3xl">{description}</p>

        {Object.keys(staff).map((el: string) => {
          const fullStaff = staff[el].slice(0, 10);

          return (
            <p className="color-white mb-6 text-base" key={el}>
              <span className="color-medium-gray text-base font-semibold">
                {fullStaff[0]?.professionText}։{" "}
                {Helper.addVirgule(fullStaff, "nameRu", "span")}
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
                <span className="color-medium-gray text-base font-semibold">
                  {title} :
                </span>{" "}
                {description}
              </p>
            );
          })}
          <div className="px-4  border-black border border-solid border-l-0 border-r-0 items-start gap-5 flex">
            <p className="color-white mb-6 text-base">Genre:</p>
            <Category category={genres.map((el) => el.genre)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Description;
