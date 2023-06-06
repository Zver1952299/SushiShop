import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import styles from '../scss/components/SushiItem.module.scss';

const FullSushi: React.FC = () => {
  const [sushi, setSushi] = useState<{
    id: string;
    composition: string;
    price: number;
    width: number;
    title: string;
    imageUrl: string;
  }>();
  const { sushiId } = useParams();

  useEffect(() => {
    async function fetchSuhsi() {
      try {
        const { data } = await axios.get(
          `https://646ca3e17b42c06c3b2bb0e7.mockapi.io/items/${sushiId}`,
        );
        return setSushi(data);
      } catch (error) {
        alert('Ошибка получения данных');
      }
    }

    fetchSuhsi();
  }, []);

  if (!sushi) {
    return <h1>Loading...</h1>;
  }

  const { composition, price, width, title, imageUrl } = sushi;

  return (
    <div className={styles.item_block}>
      <div className={styles.item_full}>
        <img src={imageUrl} alt="" className={styles.item_fullImg} />
        <h3 className={styles.item_fullTitle}>{title}</h3>
        <p className={styles.item_fullText}>{composition}</p>
        <p className={styles.item_fullWidth}>{width} gr</p>

        <div className={styles.item_fullBottom}>
          <span className={styles.item_fullPrice}>{price}$</span>
          {/* <div>
            <img onClick={onClickAdd} src={plus} alt="" className={styles.item_plus} />
            {addedCount > 0 && <span>{addedCount}</span>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FullSushi;
