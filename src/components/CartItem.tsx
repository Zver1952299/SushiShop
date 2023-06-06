import React from 'react';
import { useDispatch } from 'react-redux';

import plus from '../assets/img/plus.png';
import minus from '../assets/img/minus.png';
import cross from '../assets/img/cross.png';

import { CartItem, addItem, minusItem, removeItem } from '../redux/slices/cartSlice';

import styles from '../scss/components/CartInfo.module.scss';

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
};

const CartItemBlock: React.FC<CartItemProps> = ({ id, title, price, imageUrl, count }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want remove?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className={styles.cart_item}>
      <img src={imageUrl} alt="" className={styles.cart_img} />
      <div className={styles.cart_text}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cart_amount}>
        <img onClick={onClickMinus} src={minus} alt="" className={styles.cart_minus} />
        <span>{count}</span>
        <img onClick={onClickPlus} src={plus} alt="" className={styles.cart_plus} />
      </div>
      <span className={styles.cart_price}>{price * count} $</span>
      <img onClick={onClickRemove} src={cross} alt="" className={styles.cart_delete} />
    </div>
  );
};

export default CartItemBlock;
