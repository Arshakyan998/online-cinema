import React, { HTMLElementType} from 'react';
import { setCookie } from 'cookies-next/client';
import { Tokens } from '@/GlobalTypes/User';
import { store } from '@/store/store';

class Helper {
 
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
