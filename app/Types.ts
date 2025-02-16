export type SearchParams<T extends string | number   ='id'   > = {
    params: Promise<{ [key in T]: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };
  