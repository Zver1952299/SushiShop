import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearItems } from '../redux/slices/cartSlice';

import dlt from '../assets/img/delete.svg';

import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

import styles from '../scss/components/CartInfo.module.scss';

export default function CartInfo() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);

  const onClickClear = () => {
    if (window.confirm('Are you sure you want clear cart?')) {
      dispatch(clearItems());
    }
  };

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.cart_wrapper}>
      <div className={styles.cart_top}>
        <h2>Cart</h2>
        <span onClick={onClickClear}>
          <img src={dlt} alt="" className={styles.cart_dlt} />
          Очистить корзину
        </span>
      </div>
      <div className={styles.cart_content}>
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.cart_bottom}>
        <p>
          Всего позиций: <span>{totalCount}</span>
        </p>
        <p>
          Сумма заказа: <span>{totalPrice}$</span>
        </p>
      </div>
      <div className={styles.cart_botton}>
        <Link to="/" className={styles.cart_back}>
          Back
        </Link>
        <div className={styles.cart_pay}>Pay now</div>
      </div>
    </div>
  );
}
