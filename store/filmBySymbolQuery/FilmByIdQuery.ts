import { IData } from "../types";
import { filmApiGetById } from "./api";
import type { IActor } from "./type";
export const extendsFilmByQueryApi = filmApiGetById.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<Record<string, IActor[]>, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/staff`,
        params: {
          filmId: id,
        },
      }),
      transformResponse: (data: IActor[]) => {
        return data.reduce((aggr, el) => {
          if (!aggr[el.professionKey]) {
            aggr[el.professionKey] = [el];
          } else {
            aggr[el.professionKey].push(el);
          }

          return aggr;
        }, {} as Record<string, IActor[]>);
      },
    }),

    getSequelsAndPrequels: builder.query<
      IData<"films">,
      { filmId: string | number }
    >({
      query: ({ filmId }) => `/v2.1/films/${filmId}/sequels_and_prequels`,
      transformResponse: (data: IData<"films">["films"]): IData<"films"> => {
        return {
          total: 0,
          totalPages: 0,
          films: data,
        };
      },
    }),

    getSimilarFilms: builder.query<IData<"films">, { filmId: string | number }>(
      {
        query: ({ filmId }) => `/v2.2/films/${filmId}/similars`,
        transformResponse: (data: IData<"items">): IData<"films"> => {
          return {
            ...data,
            films: data.items,
          };
        },
      }
    ),
  }),
});
