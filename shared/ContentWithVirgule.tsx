import React, { FC, ReactNode } from 'react';

interface Props<T> {
  data: T[];
  children: (data: T, index: number, arr: T[]) => ReactNode;
  lastPoint?: string;
}

const ContentWithVirgule = <T extends string | object>({
  children,
  data,
  lastPoint,
}: Props<T>) => {
  return data?.map((el, i, arr) => {
    return (
      <React.Fragment key={i}>
        {children(el, i, arr)}
        {i === arr.length - 1 ? lastPoint || '' : ', '}
      </React.Fragment>
    );
  });
};
export default ContentWithVirgule;
