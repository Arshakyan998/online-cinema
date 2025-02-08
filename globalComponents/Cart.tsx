import { FavoritesWithoutId } from '@/GlobalTypes/Favorites';
import type { IFilms } from '@/store/types';
import { Heart } from 'lucide-react';
import Helper from '@/utils/Helper';
import Image from 'next/image';
import Link from 'next/link';
import { Rate } from 'antd';
import React from 'react';

interface Props extends IFilms {
  imgHeight: null | number;
  addFavorites: (data: FavoritesWithoutId) => void;
  showFavoriteIcon: boolean;
  IsFavorite?: boolean;
  removeFromFavorites: (filmId: number) => void;
}

const Cart: React.FC<Props> = ({
  posterUrlPreview,
  nameRu,
  year,
  genres,
  imgHeight,
  filmId,
  rating,
  addFavorites,
  showFavoriteIcon,
  IsFavorite,
  removeFromFavorites,
}) => {
  return (
    <div className=" rounded-lg overflow-hidden  cursor-pointer  mx-2">
      <div className="relative mb-6  ">
        <Image
          src={posterUrlPreview}
          alt={nameRu || ''}
          className="w-full   object-cover"
          height={500}
          loading="lazy"
          width={500}
          style={{
            height: imgHeight || '100%',
          }}
        />
        {showFavoriteIcon &&
          (IsFavorite ? (
            <Heart
              fill="yellow"
              onClick={() => removeFromFavorites(filmId)}
              className="absolute top-1.5 right-1"
            />
          ) : (
            <Heart
              className="absolute top-1.5 right-1"
              onClick={() =>
                addFavorites({
                  posterUrlPreview,
                  nameRu,
                  year,
                  genres,
                  imgHeight,
                  filmId,
                  rating,
                })
              }
            />
          ))}
        <Link
          href={`/film/${filmId}`}
          className="absolute  bottom-4 left-4 bg-white text-black text-sm px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition"
        >
          Смотреть сейчас<i className="fas fa-play"></i>
        </Link>
      </div>
      <div className="px-4 pb-4">
        <div className="text-2xl font-bold text-white mb-2">{year}</div>
        <h4 className="text-lg text-white font-bold mb-1">{nameRu}</h4>
        <div className="text-2xl font-bold text-white mb-2">
          {rating && (
            <Rate allowHalf disabled count={10} value={rating ? +rating : 1} />
          )}
        </div>
        <h6 className="text-sm text-gray-400">
          {Helper.addVirgule(genres, 'genre', 'span')}
        </h6>
      </div>
    </div>
  );
};
export default Cart;
