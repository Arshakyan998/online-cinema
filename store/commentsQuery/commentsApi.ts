import { IComments } from '@/GlobalTypes/Comments';
import comments from './api';

const commentsApi = comments.injectEndpoints({
  endpoints: build => ({
    getCommentsForFilm: build.query<IComments[], string>({
      query: movieId => ({
        url: `/comments/get-comments/${movieId}`,
      }),
    }),
  }),
});
export const { useGetCommentsForFilmQuery } = commentsApi;
export default commentsApi;
