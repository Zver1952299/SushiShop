import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { SortPropertyEnum, selectFilterSort, setSort } from '../redux/slices/filterSlice';

import styles from '../scss/components/Sort.module.scss';

type ListItem = {
  name: string;
  sortType: SortPropertyEnum;
};

export const list: ListItem[] = [
  { name: 'popularity (desc)', sortType: SortPropertyEnum.RATING_DESC },
  { name: 'popularity (asc)', sortType: SortPropertyEnum.RATING_ASC },
  { name: 'price (desc)', sortType: SortPropertyEnum.PRICE_DESC },
  { name: 'price (asc)', sortType: SortPropertyEnum.RATING_ASC },
  { name: 'name (desc)', sortType: SortPropertyEnum.TITLE_DESC },
  { name: 'name (asc)', sortType: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const sort = useSelector(selectFilterSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const onSelectSort = (obj: ListItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
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
};

export default SortPopup;
