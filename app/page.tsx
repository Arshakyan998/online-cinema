import { Metadata, ResolvingMetadata } from "next";
import Posts from "./Posts";
import { Container } from "@/components/Container";
import { Content } from "@/components/mainPage/Content";
import { Genres } from "@/components/mainPage/Geners";
import Slider from "@/components/mainPage/Slider";
import { SearchParams } from "./Types";

 
export async function generateMetadata(
  { params, searchParams }: SearchParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const product = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${7}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph || [];

  return {
    title: product.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}
export default function Home() {
  return (
    <Container>
      <Content />
      {/* <Genres/> */}
      <Slider />
    </Container>
  );
}
