import React from 'react';

import styles from '../scss/components/NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notfound_wrapper}>
      <h2>Page Not Found</h2>
    </div>
  );
};

export default NotFound;
