"use client";

import React, { CSSProperties, useEffect } from "react";
import { useTrendingMoviesQuery } from "@/store/filmsQuery/trendsMovieApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlickSlider, { Settings } from "react-slick";

import Cart from "./Cart";
import Link from "next/link";

const MOVIES_TYPES = {
  trades: "TOP_100_POPULAR_FILMS",
  bestAllTime: "TOP_250_BEST_FILMS",
  awaitFilms: "TOP_AWAIT_FILMS",
} as const;

interface Props {
  sliderOn?: boolean;
  withAnimation?: boolean;
  categoryName: string;
  requestType: keyof typeof MOVIES_TYPES;
}

const SectionWithCategory: React.FC<Props> = ({
  sliderOn,
  withAnimation,
  categoryName,
  requestType,
}) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
  };

  const { data, error, isLoading } = useTrendingMoviesQuery({
    type: MOVIES_TYPES[requestType],
    page: 1,
  });

  const [imgHeight, setImgHeight] = React.useState<number | null>(null);
  const animatedElements = React.useRef<
    WeakMap<HTMLDivElement, HTMLDivElement>
  >(new WeakMap());

  const createAnimation = (element: HTMLDivElement | null, index: number) => {
    if (!element || animatedElements.current.has(element)) return;
    animatedElements.current.set(element, element);
    const opacityKeyframes = new KeyframeEffect(
      element,
      [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 500,
        easing: "ease-out",
        delay: index * 150,
        fill: "forwards",
      }
    );

    const opacityAnimation = new Animation(opacityKeyframes, document.timeline);

    opacityAnimation.addEventListener("finish", () => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });

    opacityAnimation.play();
  };

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

  const content = data?.films.map((el, i) => {
    const styleWithAnimation: CSSProperties = withAnimation
      ? { opacity: 0, transform: "translateY(20px)" }
      : {};

    return (
      <div key={`${el.filmId}`} className="gap-6 my-2 w-2/12">
        <div
          style={{ ...styleWithAnimation }}
          ref={(element) =>
            withAnimation ? createAnimation(element, i) : element
          }
        >
          <Cart {...el} imgHeight={imgHeight} />
        </div>
      </div>
    );
  });

  return (
    <section className="trending py-10">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{categoryName}</h2>
          <Link
            href="/trends"
            className="text-sm text-white bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            View All <i className="fas fa-chevron-right ml-2"></i>
          </Link>
        </div>
        <div className="w-full">
          {sliderOn ? (
            <SlickSlider {...settings} key={"main__page"}>
              {content}
            </SlickSlider>
          ) : (
            <div className="flex flex-wrap">{content}</div>
          )}
        </div>
      </div>
    </section>
  );
};
export default SectionWithCategory;
