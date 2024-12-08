import { Metadata, NextApiHandler, ResolvingMetadata } from "next";
import React from "react";
import { SearchParams } from "../../Types";
import { filmApiGetById } from "@/store/filmByIdQuery/api";
import { store } from "@/store/store";
import Player from "@/components/filmIdPage/Player";
import Description from "@/components/filmIdPage/Description";
import { extendsFilmByQueryApi } from "@/store/filmByIdQuery/FilmByIdQuery";
import { Loading } from "@/components";

export async function generateMetadata(
  { params }: SearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  const { data } = await store.dispatch(
    filmApiGetById.endpoints.getFilmBydId.initiate({ id })
  );

  const previousImages = (await parent).title?.absolute || "";

  return {
    title: `${previousImages} | ${data?.nameRu || data?.nameOriginal}`,
    openGraph: {
      images: [
        data?.coverUrl!,
        data?.logoUrl!,
        data?.coverUrl!,
        data?.posterUrl!,
      ],
      description: data?.shortDescription,
    },
  };
}

const Film = async ({ params }: SearchParams) => {
  const id = (await params).id;

  const { data, isLoading, error } = await store.dispatch(
    filmApiGetById.endpoints.getFilmBydId.initiate({ id })
  );

  const { data: Actors } = await store.dispatch(
    extendsFilmByQueryApi.endpoints.getStaff.initiate({ id })
  );

  const { data: PrequelsAndSequels } = await store.dispatch(
    extendsFilmByQueryApi.endpoints.getSequelsAndPrequels.initiate({
      filmId: id,
    })
  );

  const { data: similarMovies, error: Z } = await store.dispatch(
    extendsFilmByQueryApi.endpoints.getSimilarFilms.initiate({
      filmId: id,
    })
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <div className="py-10">
      <Player id={data?.kinopoiskId || 0} url={data?.coverUrl || ""} />
      <Description
        {...data}
        staff={Actors}
        PrequelsAndSequels={PrequelsAndSequels}
        similarMovies={similarMovies}
      />
    </div>
  );
};
export default Film;
