'use client';

import Link from 'next/link';

import SearchModal from './SearchModal';
import Container from '../Container';
import { Button } from '@/UIkit';
import React from 'react';

export const Header = () => {
  const [showModal, setShowModal] = React.useState(false);

  const routes = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Listing',
      route: '/listig',
    },
    {
      title: 'Detail',
      route: '/detail',
    },
  ];

  const modalControllerHandler = (isOpen: boolean = true) => {
    console.log(isOpen);

    setShowModal(isOpen);
  };

  return (
    <>
      <header className="py-5 shadow-header-box-shadow">
        <Container>
          <div className="flex flex-auto justify-between items-center">
            <Link href={'/'}>LOGO NULL</Link>
            <ul className="flex row gap-12">
              {routes.map(el => {
                return (
                  <li key={el.title}>
                    <Link
                      href={el.route}
                      className="hover:text-[#58DDA3]  hover:transition-colors"
                    >
                      {el.title}
                    </Link>{' '}
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-5">
              <div className="search__block">
                {/* <form className="w-[402px] m-auto" onSubmit={submit}>
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
                <input /> 
                <button>Submit</button>
              </form> */}
                <div className="w-fit">
                  <Button
                    className={'animate-pulse'}
                    onClick={() => modalControllerHandler()}
                  >
                    Открть филитр
                  </Button>
                </div>
              </div>
            </div>

            <ul className="flex items-center gap-5">
              <li>
                <Link
                  href={'javascript:void(0)'}
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
      </header>{' '}
      {showModal && <SearchModal closeFunction={modalControllerHandler} />}
    </>
  );
};
