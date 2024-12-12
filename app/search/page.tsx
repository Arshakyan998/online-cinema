import { NextPage, ResolvingMetadata } from "next";
import { Metadata } from "next";
import React from "react";
import { SearchParams } from "../Types";
import { SearchPageContent } from "@/components";

export async function generateMetadata(
  params: SearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Поиск фильма",

    description: "Поиск вашего любимого филтма",
  };
} 

const SearchPage: NextPage<SearchParams> = () => {
  return <SearchPageContent />;
};

export default SearchPage;
