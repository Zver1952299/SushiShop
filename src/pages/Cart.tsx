import React from 'react';

import CartInfo from '../components/Cart';

import styles from '../scss/components/Cart.module.scss';

const Cart: React.FC = () => {
  return (
    <div className={styles.cart_wrapper}>
      {/* <h2>Cart is empty</h2> */}
      <CartInfo />
    </div>
  );
};

export default Cart;
