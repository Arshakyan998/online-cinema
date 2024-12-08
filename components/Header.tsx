"use client";

import React from "react";
import Link from "next/link";

import { Input } from "@/UIkit";
import { useGetGenresQuery } from "@/store/genreQuery/api";
import { useAppDispatch } from "@/hooks";
import { saveGenres } from "@/store/genreQuery/saveGeners";
import Container from "./Container";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./Loading";

export const Header = () => {
  const routes = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Listing",
      route: "/listig",
    },
    {
      title: "Detail",
      route: "/detail",
    },
  ];

  const { data, isLoading, error } = useGetGenresQuery(undefined);

  const [selectedGenres, setSelectedGenres] = React.useState<number[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  if (isLoading) return <Loading />;

  const onChangeHandler = (e: number[]) => {
    setSelectedGenres(e);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedGenres.length) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("genres", selectedGenres.toString());
      router.replace(`/search/?${params.toString()}`);
      dispatch(saveGenres.actions.saveGenres(selectedGenres));
    }
  };

  return (
    <header className="py-5 shadow-header-box-shadow">
      <Container>
        <div className="flex flex-auto justify-between items-center">
          <Link href={"/"}>LOGO NULL</Link>
          <ul className="flex row gap-12">
            {routes.map((el) => {
              return (
                <li key={el.title}>
                  <Link
                    href={el.route}
                    className="hover:text-[#58DDA3]  hover:transition-colors"
                  >
                    {el.title}
                  </Link>{" "}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-5">
            <div className="search__block">
              <form className="w-[402px] m-auto" onSubmit={submit}>
                <Input
                  icon="Search"
                  onChange={onChangeHandler}
                  value=""
                  defaultValue=""
                  data={data || []}
                />
                {/* <span>
                  <Search />
                </span>
                <input /> */}
                <button>Submit</button>
              </form>
            </div>
          </div>

          <ul className="flex items-center gap-5">
            <li>
              <Link
                href={"javascript:void(0)"}
                className="p-3 rounded-3 border-solid border-2 border-[#212020]"
              >
                <div className="relative">
                  <span className="badge_position">4</span>
                </div>
              </Link>
            </li>
            <li></li>
          </ul>
        </div>
      </Container>
    </header>
  );
};
