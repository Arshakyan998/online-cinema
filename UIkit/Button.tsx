import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';
import { Button as AntButton, ButtonProps } from 'antd';
import { ClassNameValue } from 'tailwind-merge';
import cn from '@/utils/clsx';
import Link from 'next/link';

interface Props
  extends PropsWithChildren<
    Partial<AnchorHTMLAttributes<HTMLAnchorElement>> & Partial<ButtonProps>
  > {
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
  const Props = {
    className: cn(
      'cus-btn primary flex items-center gap-2 bg-blue-500 text-white px-4 py-2 justify-center rounded-lg text-center',
      className,
    ),
    ...props,
  };

  const child = (
    <>
      {Icon || Icon} {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} {...Props}>
        {child}
      </Link>
    );
  }

  return (
    <AntButton onClick={onClick} {...Props}>
      {child}
    </AntButton>
  );
};
export default Button;
