import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearItems, selectCart } from '../redux/slices/cartSlice';

import dlt from '../assets/img/delete.svg';

import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

import styles from '../scss/components/CartInfo.module.scss';

const CartInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector(selectCart);

  const onClickClear = () => {
    if (window.confirm('Are you sure you want clear cart?')) {
      dispatch(clearItems());
    }
  };

  const totalCount: number = items.reduce((sum: number, item: any) => sum + item.count, 0);

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
        {items.map((item: any) => (
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
        <Link to="/SushiShop" className={styles.cart_back}>
          Back
        </Link>
        <div className={styles.cart_pay}>Pay now</div>
      </div>
    </div>
  );
};

export default CartInfo;
