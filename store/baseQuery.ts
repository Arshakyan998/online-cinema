import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {

    headers.set("Content-type", "appliation/json")
      headers.set("X-API-KEY", process.env.NEXT_PUBLIC_API_KEY || '')

    return headers;
  },
});
export default baseQuery;
