import { filmsApi } from "@/store/filmsQuery/api";
import { store } from "@/store/store";
import Button from "@/UIkit/Button";
import Image from "next/image";
import React from "react";

export const Content = async () => {
  const { error, data, isLoading } = await store.dispatch(
    filmsApi.endpoints.getFilms.initiate(undefined)
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <div>{"err"}</div>;
  }
  const [dataForMainPoster, ...other] = data!.items || [];

  const lastKey = dataForMainPoster?.genres.length > 1 ? "ы" : "";

  return (
    <div className="w-full py-10 hero-banner-1">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {/* Main Card */}
          <div className="lg:w-2/3 mb-8 lg:mb-0">
            <div
              className="anime-card bg-cover bg-no-repeat rounded-lg p-12 lg:p-20 w-full h-full"
              style={{ backgroundImage: `url(${dataForMainPoster?.coverUrl})` }}
            >
              <div className="content border-box">
                <Image
                  src="https://p1.hiclipart.com/preview/365/513/290/movie-logo-photographic-film-movie-camera-cinema-movie-projector-video-cameras-cinema-camera-circle-png-clipart-thumbnail.jpg"
                  alt="Logo"
                  className="logo mb-24 lg:mb-14 md:mb-10 sm:mb-7"
                  width={55}
                  height={55}
                />
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
                  {dataForMainPoster?.nameRu} <br />
                </h2>
                <ul className="flex items-center gap-3 text-sm font-semibold text-white mb-4">
                  <li className="border border-white px-2 py-1 rounded-md">
                    {dataForMainPoster?.ratingAgeLimits.slice(3)}+
                  </li>
                  <li className="border border-white px-2 py-1 rounded-md">
                    HD
                  </li>
                  <li className="border border-white px-2 py-1 rounded-md">
                    {dataForMainPoster?.year}
                  </li>
                  <li className="border border-white px-2 py-1 rounded-md">
                    {dataForMainPoster.type}
                  </li>
                
                </ul>
                <p className="text-white mb-8">
                  <strong className="text-gray-400">Жанр{lastKey} </strong>{" "}
                  {dataForMainPoster?.genres.map((el, i, arr) => (
                    <span key={el.genre}>
                      {el.genre}
                      {i === arr.length - 1 ? "" : ","}{" "}
                    </span>
                  ))}
                </p>
                <div className="flex gap-4">
                  <Button isLink href={`/${dataForMainPoster.kinopoiskId}`} />

                  <a
                    href="#"
                    className="cus-btn sec flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    <i className="fal fa-info-circle"></i> More info
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 px-3.5 py-0">
            <div className="flex flex-wrap">
              {other.map((data, i) => {
                return (
                  <div
                    className={`w-full xl:w-full mb-${i == 0 ? 8 : 0} h-[50%]`}
                    key={data.imdbId}
                  >
                    <div className="anime-sm-card p-5 rounded-xl bg-gray-800 flex items-start gap-5">
                      <Image
                        src={data?.posterUrlPreview}
                        alt={data?.nameRu || ""}
                        className="w-1/3 rounded-lg h-auto max-w-full"
                        width={500}
                        height={500}
                      />
                      <div className="content">
                        <h4 className="text-lg text-white mb-2">
                          {data?.nameRu}
                        </h4>
                        <ul className="flex items-center flex-wrap gap-2 text-gray-400 text-sm font-semibold mb-4">
                          <li>{data?.year}</li>
                          <li className="sec border border-gray-400 px-2 py-1 rounded-md">
                            {data?.ratingAgeLimits?.slice(3)}
                          </li>
                          {/* <li> {dataForSecondPoster}</li> */}
                          <li>{data?.type}</li>
                        </ul>
                        <p className="text-sm text-gray-500 mb-8">
                          {data?.description.slice(0, 150)}...
                        </p>
                        <Button isLink href={`/${data.kinopoiskId}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};