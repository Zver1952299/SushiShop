import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../scss/components/Pagination.module.scss';

type PaginationProps = {
  pageCount: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pageCount, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
