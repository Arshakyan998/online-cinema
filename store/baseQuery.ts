import { BaseQueryApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getCookie } from 'cookies-next/client';
import { saveUser } from './user/userSlice';
import Helper from '@/utils/Helper';
const getLoginApi = () => import('./auth/loginApi').then(data => data.default);

const baseQueryWithAuth = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      if (baseUrl === process.env.NEXT_PUBLIC_BASE_URL){
        headers.set('X-API-KEY', process.env.NEXT_PUBLIC_API_KEY || '');
      }
      if (!headers.has('authorization')) {
        headers.set('authorization', `Bearer ${getCookie  ('access_token')}`);
      }

      return headers;
    },
    credentials:
      baseUrl === process.env.NEXT_PUBLIC_BACKEND_URL
        ? 'include'
        : 'same-origin',
  });

export const baseQuery = async (
  args: any,
  api: BaseQueryApi,
  extraOptions: {},
  auth: boolean = false,
) => {
  const baseUrl = auth
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_BASE_URL;

  const baseAuthQuery = baseQueryWithAuth(baseUrl!);

  let result = await baseAuthQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refresh_token = getCookie('refresh_token');

    if (refresh_token) {
      const loginApi = await getLoginApi();
      const tokens = await api
        .dispatch(loginApi.endpoints.refreshTokens.initiate(refresh_token))
        .unwrap();

      if (tokens) {
        const user = await api
          .dispatch(loginApi.endpoints.getUser.initiate(tokens.access_token))
          .unwrap();
        Helper.updateTokens(tokens);
        api.dispatch(saveUser(user));
      } else {
        // api.dispatch(logout());
        if (typeof window === 'undefined') {
          return { error: { status: 401, data: 'Unauthorized' } };
        } else {
          window.location.href = '/login';
        }
      }
    }
  }

  return result;
};

export default baseQuery;
