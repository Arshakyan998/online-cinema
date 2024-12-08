"use client";
import React, { useEffect } from "react";
import SectionWithCategory from "../SectionWithCategory";
import Pagination from "../Pagination";
import { useSearchParams } from "next/navigation";
import {
  extendedFilmsApi,
  useLazyGetByGenreQuery,
} from "@/store/filmsQuery/trendsMovieApi";
import Loading from "../Loading";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const [fetchData, { data, isLoading, error }] = useLazyGetByGenreQuery();
  const getParams = (searchParams.get("genres") as string)?.split(",");

  useEffect(() => {
    fetchData({
      genres: getParams,
    });
  }, []);

  if (isLoading) return <Loading/>;
  if (error) return <div>Err</div>;

  const pageChange = (page: number) => {
     fetchData({
      genres: getParams,
      page,
    });
 
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col">
      <SectionWithCategory
        categoryName="Поиск"
        externalData={data || undefined}
        withAnimation
      />
      {!!data?.films?.length && (
        <Pagination
          total={data.total}
          pageCount={data.films.length}
          onChange={pageChange}
        />
      )}{" "}
    </div>
  );
};

export default SearchPageContent;
