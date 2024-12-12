export interface ICountry {
  country: string;
}

export interface IGenre {
  genre: string;
}

export interface IFilms {
  countries: ICountry[];
  genres: IGenre[];
  imdbId: null;
  kinopoiskId: number;
  nameEn: null;
  nameOriginal: string;
  nameRu: null;
  posterUrl: URL;
  posterUrlPreview: string;
  ratingImdb: null;
  ratingKinopoisk: number;
  type: string;
  coverUrl: URL;
  ratingAgeLimits: string;
  year: number;
  description: string;
  rating?: string | number;
  filmId?: number;
}

export type IData<KeyType extends 'items' | 'films'> = {
  [K in KeyType]: IFilms[];
} & {
  total: number;
  totalPages: number;
};
