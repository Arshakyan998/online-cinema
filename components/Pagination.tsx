import { Pagination as AntPagination } from 'antd';
import React from 'react';

interface Props {
  total: number;
  pageCount: number;
  onChange: (page: number, pageSize: number) => void;
}

const Pagination: React.FC<Props> = ({ total, pageCount, onChange }) => {
  //   const getPages = Helper.createPagination({ pageCount, total });

  return (
    <AntPagination
      total={total}
      showSizeChanger={false}
      pageSize={pageCount}
      onChange={onChange}
    />
  );
};

export default Pagination;
