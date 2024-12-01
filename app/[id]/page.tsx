import { Metadata, NextApiHandler, ResolvingMetadata } from "next";
import React from "react";
import { SearchParams } from "../Types";
import { filmApiGetById } from "@/store/filmByIdQuery/api";
import { store } from "@/store/store";
import Player from "@/components/filmIdPage/Player";
import Description from "@/components/filmIdPage/Description";

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
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="py-10">
      <Player id={data?.kinopoiskId || 0} url={data?.coverUrl || ""} />
      <Description {...data} />
    </div>
  );
};
export default Film;
