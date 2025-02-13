'use client';

import React, { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { useAppSelector } from '@/hooks';
import Link from 'next/link';

interface Props
  extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {}

const LinkWithUserId: React.FC<Props> = ({ children, href, ...props }) => {
  const userId = useAppSelector(state => state['user/data'].user.id);

  if (!userId) {
    console.warn('user not exist please use Link component');
    return null;
  }

  return (
    <Link href={`${href}/${userId}`} {...props}>
      {children}
    </Link>
  );
};

export default LinkWithUserId;
