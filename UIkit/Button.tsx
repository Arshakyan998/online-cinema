'use client';
import { ClassNameValue } from 'tailwind-merge';
import cn from '@/utils/clsx';
import Link from 'next/link';
import React from 'react';

interface Props extends React.PropsWithChildren {
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  isLink?: boolean;
  href?: string;
  className?: ClassNameValue;
}

const Button: React.FC<Props> = ({
  onClick,
  isLink = false,
  href,
  children = 'Смотерть',
  className,
}) => {
  const Component = isLink ? Link : 'button';

  const props = isLink ? { href } : { onClick };

  return (
    <Component
      className={cn(
        'cus-btn primary flex items-center gap-2 bg-blue-500 text-white px-4 py-2 justify-center rounded-lg text-center',
        className,
      )}
      {...props}
    >
      <i className="far fa-play"></i> {children}
    </Component>
  );
};
export default Button;
