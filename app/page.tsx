import SectionWithCategory from '@/components/SectionWithCategory';
import { Content } from '@/components/mainPage/Content';
import { Metadata, ResolvingMetadata } from 'next';
import filmsApi from '@/store/filmsQuery/api';
import { Container } from '@/components';
import { SearchParams } from './Types';
import { store } from '@/store/store';

export async function generateMetadata(
  { params, searchParams }: SearchParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const product = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${7}`,
  ).then(res => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph || [];

  return {
    title: product.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}
export default async function Home() {
  const { error, data, isLoading } = await store.dispatch(
    filmsApi.endpoints.getFilms.initiate(undefined),
  );

  return (
    <Container>
      <Content isLoading={isLoading} error={error} data={data} />
      {/* <Genres/> */}
      <SectionWithCategory
        sliderOn
        withAnimation
        categoryName="В Тренде"
        requestType="trades"
      />
      <SectionWithCategory
        categoryName="Лучше за все время"
        withAnimation
        requestType="bestAllTime"
      />
    </Container>
  );
}
