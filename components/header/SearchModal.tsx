'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveGenres } from '@/store/genreQuery/saveGeners';
import { useGetGenresQuery } from '@/store/genreQuery/api';
import { IGenre } from '@/GlobalTypes/Genre';
import { Loading } from '@/globalComponents';
import { Button, Input, Tag } from '@/UIkit';
import { createPortal } from 'react-dom';
import { useAppDispatch } from '@/hooks';
import { Form } from 'antd';
import React from 'react';

interface Props {
  closeFunction: (isOpne: boolean) => void;
}

const SearchModal: React.FC<Props> = ({ closeFunction }) => {
  const { data, isLoading, error } = useGetGenresQuery(undefined);

  const [selectedGenres, setSelectedGenres] = React.useState<IGenre[]>([]);
  const usedGenres = React.useRef<Map<number, number>>(new Map());

  const [searchValue, setSearchValue] = React.useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const { innerHeight } = window;

  const onClickHandler = (genreId: IGenre) => {
    setSelectedGenres(prev => [...prev, genreId]);
    usedGenres.current.set(genreId.id, genreId.id);
    updatePath('genres');
  };

  const updatePath = (
    key: 'genres' | 'moviesName',
    redirect: boolean = false,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'genres') {
      params.set(key, usedGenres.current.keys().toArray().toString());
      redirect && router.replace(`/search/?${params.toString()}`);
      return;
    }
    params.set(key, searchValue);
    redirect && router.replace(`/search/?moviesName=${searchValue}`);
  };

  const searchByFilters = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeFunction(false);

    if (searchValue) {
      updatePath('moviesName', true);
      dispatch(saveGenres.actions.saveGenres([]));
      return;
    }

    if (selectedGenres.length) {
      updatePath('genres', true);
      dispatch(saveGenres.actions.saveGenres(selectedGenres));
    }
  };

  const closeHandler = (id: number) => {
    usedGenres.current.delete(id);
    updatePath('genres');
    const selected = selectedGenres.filter(el => el.id !== id);
    setSelectedGenres(selected);
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    updatePath('moviesName');
  };

  return createPortal(
    <div
      className="absolute top-0 left-0 w-full h-full z-10 bg-black-rgba  animate-fadeInCustom"
      style={{ height: innerHeight }}
    >
      <div className="w-9/12 absolute h-5/6   rounded-lg z-20  bg-background top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <Form>
          <div className="flex justify-around p-5">
            <div className="flex w-6/12 flex-col">
              <div className="flex flex-wrap gap-2 p-3 border-b border-white">
                {data?.map(genre => {
                  return (
                    <Tag
                      key={genre.id}
                      onClick={() => onClickHandler(genre)}
                      disabled={
                        usedGenres.current.has(genre.id) || !!searchValue
                      }
                    >
                      {genre.genre}
                    </Tag>
                  );
                })}
              </div>
              <div className="flex items-start flex-wrap gap-2 p-3 border border-white rounded-lg min-h-56 h-fit m-3">
                {selectedGenres.map(selected => {
                  return (
                    <Tag
                      key={selected.id}
                      isClosable
                      disabled={!!searchValue}
                      onClose={() => closeHandler(selected.id)}
                    >
                      {selected.genre}
                    </Tag>
                  );
                })}
              </div>
            </div>

            <div className="w-6/12 items-end">
              <div className="w-[88%]">
                <Input
                  placeholder="Поиск по названю"
                  onChange={searchHandler}
                />
              </div>
            </div>
          </div>
          <Button className={'w-4/12 m-auto mt-48'} onClick={searchByFilters}>
            Найти
          </Button>
        </Form>
      </div>
    </div>,
    document.body,
  );
};

export default SearchModal;
