import { filmApiGetById } from './api';
import { IData } from '../../GlobalTypes/Film';

export const extendsFilmByKeyword = filmApiGetById.injectEndpoints({
  endpoints: builder => ({
    getFilmByName: builder.query<IData<'films'>, { keyword: string }>({
      query: ({ keyword }) => ({
        url: '/v2.2/films',
        params: {
          keyword,
        },
      }),
      transformResponse: (data: Partial<IData<'items'>>): IData<'films'> => {
        const transformData = {
          ...data,
          films: [...(data.items || [])],
        };
        delete transformData.items;

        return transformData as Required<IData<'films'>>;
      },
    }),
  }),
});
export const { useLazyGetFilmByNameQuery } = extendsFilmByKeyword;
