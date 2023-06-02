import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from '../scss/components/Pagination.module.scss';

const Pagination = ({ pageCount, onChangePage }) => {
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
