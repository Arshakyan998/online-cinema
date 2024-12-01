"use client";

import React, { useEffect } from "react";
import { useTrendingMoviesQuery } from "@/store/filmsQuery/trendsMovieApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlickSlider, { Settings } from "react-slick";

import Cart from "./Cart";

const Slider = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
  };

  const { data, error, isLoading } = useTrendingMoviesQuery({
    type: "TOP_100_POPULAR_FILMS",
    page: 1,
  });

  const [imgHeight, setImgHeight] = React.useState<number | null>(null);
  console.log(data);

  useEffect(() => {
    if (data?.films) {
      const imagePromises = data.films.map((el) => {
        return new Promise<number>((resolve, reject) => {
          const img = new Image();
          img.src = el.posterUrlPreview;

          img.onload = () => resolve(img.height);
          img.onerror = () => reject("Error loading image");
        });
      });

      Promise.all(imagePromises).then((heights) => {
        setImgHeight(Math.max(...heights));
      });
    }
  }, [data?.films]);

  if (error) return <div>error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <section className="trending py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">В тренде</h2>
          <a
            href="https://uiparadox.co.uk/templates/vivid/v2/anime-listing.html"
            className="text-sm text-white bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            View All <i className="fas fa-chevron-right ml-2"></i>
          </a>
        </div>
        <div className="w-full">
          <SlickSlider {...settings} key={"main__page"}>
            {data?.films.map((el) => {
              return (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 my-2 "
                  key={`${el.filmId}`}
                >
                  <Cart {...el} imgHeight={imgHeight} />
                </div>
              );
            })}
          </SlickSlider>
        </div>
      </div>
    </section>
  );
};
export default Slider;
