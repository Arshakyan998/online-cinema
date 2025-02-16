'use client';

import React, {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
  WheelEventHandler,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface Props<T> {
  data?: T[];
  children: ReactNode;
  className: string;
  rowCount?: number;
}

const Virtualize = <T extends object>({
  children,
  className,
  rowCount,
  data,
}: Props<T>) => {
  //   const [rowCountInViewPort, setRowCountInViewPort] = useState<number>();
  //   const [itemHeight, setItemHeight] = useState<number>();
  //   const [firstIndex, setFirstIndex] = useState(0);
  //   const [lastIndex, setLastIndex] = useState(0);
  //   const [optimizedData, setOptimizedData] = useState<HTMLElement>([]);
  //   const parentRef = useRef<HTMLDivElement | null>(null);

  //   useEffect(() => {
  //     if (rowCount) {
  //       setRowCountInViewPort(rowCount);
  //       return;
  //     }
  //     if (parentRef.current) {
  //       const calculateRow =
  //         window.innerHeight / parentRef.current.children[0].clientHeight;
  //       setRowCountInViewPort(Math.ceil(calculateRow));

  //       setItemHeight(715);
  //     }
  //   }, [rowCount, parentRef.current, parentRef.current?.firstChild]);

  //   useEffect(() => {
  //     if (firstIndex && lastIndex && parentRef.current) {
  //       const items = [];
  //       for (let i = firstIndex; i < lastIndex; i++) {
  //         console.log(i);
  //       }
  //     }
  //   }, [firstIndex, lastIndex, parentRef]);

  //   const scrollHandler: WheelEventHandler<HTMLDivElement> = e => {
  //     const firstIndex = Math.floor(
  //       e.currentTarget.scrollTop / (itemHeight || 1),
  //     );
  //     setFirstIndex(firstIndex);
  //     const getLastIndex = Math.floor(
  //       (window.innerHeight + e.currentTarget.scrollTop) / (itemHeight || 1),
  //     );
  //     setLastIndex(getLastIndex);
  //   };
  return (
    <div
      //   onScroll={scrollHandler}
      className={twMerge(className, 'visuilizer  overflow-y-scroll')}
      style={{
        height: `${window.innerHeight}px`,
      }}
      //   ref={parentRef}
    >
      {children}
    </div>
  );
};

export default Virtualize;
