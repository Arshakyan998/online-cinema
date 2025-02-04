import React, { PropsWithChildren, ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import cn from '@/utils/clsx';
import Link from 'next/link';

interface Props extends PropsWithChildren<Partial<HTMLButtonElement>> {
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: ClassNameValue;
  Icon?: ReactNode;
}

const Button: React.FC<Props> = ({
  onClick,
  href,
  children = 'Смотерть',
  className,
  Icon,
  ...props
}) => {
  const Component = href ? Link : 'button';

  const typeProps = href ? { href } : { onClick };

  return (
    <Component
      className={cn(
        'cus-btn primary flex items-center gap-2 bg-blue-500 text-white px-4 py-2 justify-center rounded-lg text-center',
        className,
      )}
      {...props}
      {...typeProps}
    >
      {Icon || Icon} {children}
    </Component>
  );
};
export default Button;
