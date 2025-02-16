import { IFilms } from '@/GlobalTypes/Film';

export type Favorites = Pick<
  IFilms,
  'posterUrlPreview' | 'nameRu' | 'year' | 'filmId' | 'genres' | 'rating'
> & { imgHeight: number | null; id: string };

export type FavoritesWithoutId = Omit<Favorites, 'id'>;
