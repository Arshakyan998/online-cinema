'use client';

import { useTrendingMoviesQuery } from '@/store/filmsQuery/trendsMovieApi';
import React, { CSSProperties, useEffect } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Skeleton, Space } from 'antd';
import { IData } from '@/store/types';
import { useObserver } from '@/hooks';
import Link from 'next/link';

import { Heart } from 'lucide-react';
import Cart from './Cart';

const MOVIES_TYPES = {
  trades: 'TOP_100_POPULAR_FILMS',
  bestAllTime: 'TOP_250_BEST_FILMS',
  awaitFilms: 'TOP_AWAIT_FILMS',
} as const;
const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: false,
};
interface Props {
  sliderOn?: boolean;
  withAnimation?: boolean;
  categoryName: string;
  requestType?: keyof typeof MOVIES_TYPES;
  externalData?: IData<'films'>;
  action?: () => void;
  actionButtonTitle?: string;
}

const SectionWithCategory: React.FC<Props> = ({
  sliderOn,
  withAnimation,
  categoryName,
  requestType = 'bestAllTime',
  externalData,
  action,
  actionButtonTitle,
}) => {
  const {
    data: moviesData,
    error,
    isLoading,
  } = useTrendingMoviesQuery(
    {
      type: MOVIES_TYPES[requestType],
      page: 1,
    },
    {
      skip: !!externalData?.films?.length,
    },
  );

  const data = externalData || moviesData;

  const [imgHeight, setImgHeight] = React.useState<number | null>(null);
  const animatedElements = React.useRef<
    WeakMap<HTMLDivElement, HTMLDivElement>
  >(new WeakMap());
  const rootRef = React.useRef<HTMLElement>(null);
  const observer = useObserver({ root: rootRef.current });

  let delay = 1;

  const createAnimation = (element: HTMLDivElement | null, i: number) => {
    if (!element || animatedElements.current.has(element)) return;
    animatedElements.current.set(element, element);

    if (delay < 5) {
      delay++;
    } else {
      delay = 2;
    }

    // const delay =
    //   (index > 3 ? index - Math.trunc(Math.abs(index - index / 4)) : index) *
    //   200;

    // console.log({
    //   mt: Math.trunc(index / 4) * 100,
    //   element,
    //   index,
    //   delay,
    // }) ;

    const opacityKeyframes = new KeyframeEffect(
      element,
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 500,
        easing: 'ease-out',
        delay: delay * 200,
        fill: 'forwards',
      },
    );

    const opacityAnimation = new Animation(opacityKeyframes, document.timeline);

    opacityAnimation.addEventListener('finish', () => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
    if (sliderOn) {
      opacityAnimation.play();
      return;
    }
    observer(() => opacityAnimation.play()).observe(element);
  };

  useEffect(() => {
    if (data?.films) {
      const imagePromises = data.films.map(el => {
        return new Promise<number>((resolve, reject) => {
          const img = new Image();
          img.src = el.posterUrlPreview;

          img.onload = () => resolve(img.height);
          img.onerror = () => reject('Error loading image');
        });
      });

      Promise.all(imagePromises).then(heights => {
        setImgHeight(Math.max(...heights));
      });
    }
  }, [data?.films]);

  if (error) return <div>error</div>;
  if (isLoading)
    return (
      <Space>
        <Skeleton.Node active style={{ width: 160 }} />
      </Space>
    );

  const content = data?.films?.map((el, i) => {
    const styleWithAnimation: CSSProperties = withAnimation
      ? { opacity: 0, transform: 'translateY(20px)' }
      : {};

    return (
      <div key={`${el.filmId || el.kinopoiskId}`} className="gap-6 my-2 w-3/12">
        <div
          style={{ ...styleWithAnimation }}
          ref={element =>
            withAnimation ? createAnimation(element, i) : element
          }
        >
          {imgHeight && (
            <Cart
              {...el}
              filmId={el.filmId || el.kinopoiskId}
              imgHeight={imgHeight}
              rating={el.rating || el.ratingKinopoisk}
            />
          )}
        </div>
      </div>
    );
  });

  return (
    <section className="trending py-10" ref={rootRef}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{categoryName}</h2>
          {actionButtonTitle && action && (
            <Link
              href="/trends"
              className="text-sm text-white bg-primary px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
              {actionButtonTitle}
            </Link>
          )}
        </div>
        <div className="w-full">
          {sliderOn ? (
            <SlickSlider {...settings} key={'main__page'}>
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
