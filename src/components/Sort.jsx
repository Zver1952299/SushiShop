import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import styles from '../scss/components/Sort.module.scss';

import { setSort } from '../redux/slices/filterSlice';

export const list = [
  { name: 'popularity (desc)', sortType: 'raiting' },
  { name: 'popularity (asc)', sortType: '-raiting' },
  { name: 'price (desc)', sortType: 'price' },
  { name: 'price (asc)', sortType: '-price' },
  { name: 'name (desc)', sortType: 'title' },
  { name: 'name (asc)', sortType: '-title' },
];

export default function Sort() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();

  const onSelectSort = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort_wrapper}>
        <p className={styles.sort_text}>
          sort by:{' '}
          <span onClick={() => setOpen(!open)} className={styles.sort_variant}>
            {sort.name}
          </span>
        </p>
      </div>
      {open && (
        <div className={styles.sort_popup}>
          <ul>
            {list.map((obj, i) => (
              <li
                onClick={() => onSelectSort(obj)}
                key={i}
                className={sort.name === obj.name ? classNames(`${styles.sort_active}`) : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
