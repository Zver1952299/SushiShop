import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { addItem } from '../../redux/slices/cartSlice';

import styles from '../../scss/components/SushiItem.module.scss';

import plus from '../../assets/img/plus.svg';

export default function SushiItem({ id, imageUrl, title, composition, price, size, width }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: activeSize,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={styles.item_block}>
      <div className={styles.item_wrapper}>
        <img src={imageUrl} alt="" className={styles.item_img} />
        <h3 className={styles.item_title}>{title}</h3>
        <p className={styles.item_text}>
          {composition.length > 80 ? `${composition.substr(0, 80)}...` : composition}
        </p>
        <p className={styles.item_width}>{width} gr</p>
        <div className={styles.item_size}>
          <ul>
            {size.map((value, index) => (
              <li
                key={value}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? classNames(`${styles.item_active}`) : ''}>
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.item_bottom}>
          <span className={styles.item_price}>{price}$</span>
          <div>
            <img onClick={onClickAdd} src={plus} alt="" className={styles.item_plus} />
            {addedCount > 0 && <span>{addedCount}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
