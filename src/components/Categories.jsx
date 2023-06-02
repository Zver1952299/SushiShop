import React from 'react';
import classNames from 'classnames';

import styles from '../scss/components/Categories.module.scss';

export default function Categories({ value, onChangeCategory }) {
  const CategArr = ['All', 'Rolls', 'Baked rolls', 'Sets'];

  return (
    <div className={styles.categ_wrapper}>
      <ul className={styles.categ_items}>
        {CategArr.map((item, index) => (
          <li
            key={item}
            onClick={() => onChangeCategory(index)}
            className={
              value === index
                ? classNames(`${styles.categ_item}`, `${styles.active}`)
                : classNames(`${styles.categ_item}`)
            }>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
