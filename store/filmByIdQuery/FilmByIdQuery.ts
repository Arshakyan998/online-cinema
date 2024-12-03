import { filmApiGetById } from "./api";
import type { IActor } from "./type";
export const getStaff = filmApiGetById.injectEndpoints({
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
  }),
});
