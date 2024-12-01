"use client";
import { useGetGenresQuery } from "@/store/genreQuery/api";
import Link from "next/link";
import React from "react";

export const Genres = () => {
  const { data, isLoading, error } = useGetGenresQuery(undefined);

  if (isLoading) return <div>Loading</div>;
  if (error) return null;

  return (
    <section className="categories py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {Object.keys(data!).map((el) => {
            return (
              el && (
                <div className="mb-6" key={el}>
                  <Link
                    href=" javascript:void(0)"
                    className="flex items-center gap-6 p-6 rounded-lg border border-gray-700 transition-all duration-500 hover:shadow-lg hover:shadow-green-300"
                  >
                    <img
                      src="https://www.nopcommerce.com/images/thumbs/0005720_coming-soon-page_550.jpeg"
                      alt=""
                      className="w-2/5"
                    />
                    <div className="content">
                      <h2 className="text-2xl sm:text-3xl xl:text-4xl text-white mb-1 break-words w-full">
                        {el}
                      </h2>
                      <span className="text-gray-400 text-sm sm:text-base">
                        850+
                      </span>
                    </div>
                  </Link>

                  {/* Дублируйте этот блок для остальных категорий */}
                </div>
              )
            );
          })}
        </div>
      </div>
    </section>
  );
};
