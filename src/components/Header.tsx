import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { selectCart } from '../redux/slices/cartSlice';
import Search from './Search';

import styles from '../scss/components/Header.module.scss';

import logo from '../assets/img/logo.svg';
import cart from '../assets/img/cart.svg';

const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();

  const totalCount: number = items.reduce((sum: number, item: any) => sum + item.count, 0);

  return (
    <header className={styles.header}>
      <Link to="/SushiShop/" className={styles.logo}>
        <img src={logo} alt="logo_img" className={styles.logo_img} />
        <div className={styles.logo_text}>
          <h2 className={styles.logo_title}>Sushi</h2>
          <h3 className={styles.logo_subtitle}>Best sushi & sashimi</h3>
        </div>
      </Link>
      <div className={styles.header_middle}>
        <nav className={styles.nav}>
          <Link to="/SushiShop/" className={styles.nav_link}>
            Home
          </Link>
          <Link to="/aboutus" className={styles.nav_link}>
            About us
          </Link>
          <Link to="/contacts" className={styles.nav_link}>
            Contacts
          </Link>
        </nav>
        <Search />
      </div>
      <div>
        {location.pathname !== '/cart' && (
          <Link to="/cart" className={styles.cart}>
            <img src={cart} alt="cart" className={styles.cart_img} />
            {totalCount > 0 ? <span className={styles.cart_count}>{totalCount}</span> : ''}
            <p className={styles.cart_total}>{totalPrice}$</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
