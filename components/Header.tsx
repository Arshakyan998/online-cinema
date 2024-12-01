import React from "react";
import { Container } from "./Container";
import Link from "next/link";

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
                    {" "}
                    {el.title}{" "}
                  </Link>{" "}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-5">
            <div className="search__block">
              <form className="input-group  w-[402px] m-auto">
                <button> M</button>
                <input />
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
