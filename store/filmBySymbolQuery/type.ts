import { ICountry, IGenre } from "../types";


export  interface IActor {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}

export interface IFilm {
  kinopoiskId: number;
  kinopoiskHDId: string | null;
  imdbId: string | null;
  nameRu: string | null;
  nameEn: string | null;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string | null;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number | null;
  ratingAwaitCount: number;
  ratingRfCritics: number;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string | null;
  isTicketsAvailable: boolean;
  productionStatus: string | null;
  type: "FILM" | "SERIAL";
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: ICountry[];
  genres: IGenre[];
  startYear: number | null;
  endYear: number | null;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
}
