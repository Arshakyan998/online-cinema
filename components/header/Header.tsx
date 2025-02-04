'use client';

import Link from 'next/link';

import LinkWithUserId from '@/globalComponents/LinkWithId';
import Container from '../../globalComponents/Container';
import { useCreateUserMutation } from '@/store/auth/api';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Avatar, Dropdown, MenuProps } from 'antd';
import userSlice from '@/store/user/userSlice';
import { Settings, Heart } from 'lucide-react';
import React, { useEffect } from 'react';
import SearchModal from './SearchModal';
import { Button } from '@/UIkit';
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

const menuItems: MenuProps['items'] = [
  {
    key: 1,
    label: <Link href={'/user/settings'}>Настрйки</Link>,
    icon: <Settings />,
  },
  {
    key: 2,
    label: <LinkWithUserId href={'/favorites'}>Выбранные</LinkWithUserId>,

    icon: <Heart />,
  },
];

export const Header = () => {
  const [showModal, setShowModal] = React.useState(false);

  const modalControllerHandler = (isOpen: boolean = true) => {
    setShowModal(isOpen);
  };

  const user = useAppSelector(state => state['user/data'].user);


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
                {user.id ? (
                  <>
                    <Dropdown menu={{ items: menuItems }}>
                      <Avatar
                        className="cursor-pointer"
                        alt={user.name}
                        src={user.avatarUrl}
                        size={50}
                      >
                        {user.name[0].toUpperCase()}
                      </Avatar>
                    </Dropdown>
                    <div className="relative">
                      <span className="badge_position">4</span>
                    </div>
                  </>
                ) : (
                  <Button href="/auth/signup">Вход</Button>
                )}
              </li>
              <li></li>
            </ul>
          </div>
        </Container>
      </header>
      {showModal && <SearchModal closeFunction={modalControllerHandler} />}
    </>
  );
};
