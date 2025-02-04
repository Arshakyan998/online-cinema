import React, { PropsWithChildren, ReactHTML } from 'react';
import { setCookie } from 'cookies-next/client';
import { Tokens } from '@/GlobalTypes/User';
import { store } from '@/store/store';

class Helper {
  static addVirgule = <T extends object | string>(
    arr: T[],
    key: keyof T,
    tag: keyof ReactHTML = 'span',
    className?: string,
  ) => {
    return arr?.map((el, i) => {
      const content = (typeof el === 'object' ? el[key] : el) as string;

      if (!content) return null;
      const contentWithVirgule =
        content + '' + (i === arr.length - 1 ? ' ' : ', ');

      return React.createElement(
        tag,
        { className, key: content },
        contentWithVirgule,
      );
    });
  };

  static createPagination = ({
    total,
    pageCount,
  }: {
    total: number;
    pageCount: number;
  }) => {
    return new Array(total / pageCount).map((_, i) => i + 1);
  };

  static updateTokens = ({ access_token, refresh_token }: Tokens) => {
    setCookie('access_token', access_token);
    setCookie('refresh_token', refresh_token);
  };
}
export default Helper;
