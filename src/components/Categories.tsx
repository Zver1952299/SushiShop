import React from 'react';
import classNames from 'classnames';

import styles from '../scss/components/Categories.module.scss';

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const CategArr: string[] = ['All', 'Rolls', 'Baked rolls', 'Sets'];

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
};

export default Categories;
