import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQueryWithAuth = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('X-API-KEY', process.env.NEXT_PUBLIC_API_KEY || '');
      return headers;
    },
  });

export const baseQuery = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: any,
  auth: boolean = false,
) => {
  const baseUrl = auth
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

  const baseAuthQuery = baseQueryWithAuth(baseUrl!);

  let result = await baseAuthQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseAuthQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken: api.getState().auth.refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // api.dispatch(refreshToken(refreshResult.data));
      result = await baseAuthQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
      if (typeof window === 'undefined') {
        return { error: { status: 401, data: 'Unauthorized' } };
      } else {
        window.location.href = '/login';
      }
    }
  }

  return result;
};

export default baseQuery;
