'use client';

import { useCreateUserMutation } from '@/store/auth/api';
import { ICreateUserDate } from '@/GlobalTypes/Auth';
import { useRouter } from 'next/navigation';
import Helper from '@/utils/Helper';
import { Button } from '@/UIkit';
import React from 'react';

const SignIn: React.FC = () => {
  const [userData, setUserData] = React.useState<ICreateUserDate>(
    {} as ICreateUserDate,
  );
  const [trigger, { error }] = useCreateUserMutation({});
  // const dispatch = useAppDispatch();
  // const navigate = useRouter();
  if (error) {
    console.log(error);
  }

  const setDataFormUser = (name: keyof ICreateUserDate, date: string) => {
    setUserData(prev => ({ ...prev, [name]: date }));
  };

  const createUser: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const createdUser = await trigger(userData).unwrap();
    if (createdUser) {
      Helper.updateTokens(createdUser.tokens);
    }
  };

  return (
    <section className=" dark:bg-gray-900">
      <div className="lg:grid  W-[80%]">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={createUser}>
              <div className="col-span-6 col-span-6 sm:col-span-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Full name
                </label>

                <input
                  type="text"
                  id="fullName"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={e =>
                    setDataFormUser('fullName', e.currentTarget.value)
                  }
                />
              </div>
              <div className="col-span-6 col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  name
                </label>

                <input
                  type="text"
                  id="name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={e => setDataFormUser('name', e.currentTarget.value)}
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={e =>
                    setDataFormUser('email', e.currentTarget.value.trim())
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  onChange={e =>
                    setDataFormUser('password', e.currentTarget.value.trim())
                  }
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                  />

                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to our
                  <a
                    href="#"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    terms and conditions
                  </a>
                  and
                  <a
                    href="#"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    {' '}
                    privacy policy{' '}
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  Already have an account?
                  <Button className="text-gray-700 underline dark:text-gray-200">
                    Log in
                  </Button>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignIn;
