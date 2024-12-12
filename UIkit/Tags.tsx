import { EyeClosedIcon, X } from 'lucide-react';
import React from 'react';

interface Props extends React.PropsWithChildren {
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  isClosable?: boolean;
  onClose?: () => void;
  disabled?: boolean;
}

const Tag: React.FC<Props> = ({
  children,
  onClick,
  isClosable,
  onClose,
  disabled = false,
}) => {
  return (
    <button
      className="flex items-center gap-3 text-sm font-semibold text-white mb-4 disabled:text-disable"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="border flex items-center justify-center border-white px-2 py-1 rounded-md disabled:border-disable">
        {children}{' '}
        {isClosable && (
          <X width={15} className="ml-2" onClick={() => onClose?.()} />
        )}
      </span>
    </button>
  );
};
export default Tag;
