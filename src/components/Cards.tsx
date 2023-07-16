'use client';
import axios from 'axios';
import styles from './Cards.module.css';
import { IEmojiResponse } from '@/interfaces/EmojiResponse';
import useCategoryStore from '@/store/categories';
import { useEffect } from 'react';
import { config } from '@/config';
import { Spinner } from './Spinner';

const getEmojis = async (
  category: string,
  skip: number
): Promise<IEmojiResponse> =>
  axios
    .get(
      `/api/get-emoji?category=${category}&skip=${skip}&limit=${config.limit}`
    )
    .then(({ data }) => data ?? []);

const Cards = () => {
  const { emojis, setEmojis, category, skip, setLoading, isLoading } =
    useCategoryStore();
  useEffect(() => {
    setLoading(true);
    getEmojis(category, skip)
      .then((emojis) => setEmojis(emojis))
      .finally(() => {
        setLoading(false);
      });
  }, [category, skip]);

  return isLoading ? (
    <div className={styles.SpinnerWindow}>
      <Spinner></Spinner>
    </div>
  ) : (
    <main className={styles.main}>
      {emojis.map((emojiItem) => (
        <div
          className={styles.card}
          key={emojiItem.name + emojiItem.htmlCode.join(':')}>
          <div
            className={styles.emoji}
            dangerouslySetInnerHTML={{ __html: emojiItem.htmlCode[0] }}
          />
          <div className={styles.details}>
            <p className={styles.name}>Name: {emojiItem.name}</p>
            <p className={styles.category}>Category: {emojiItem.category}</p>
            <p className={styles.group}>Group: {emojiItem.group}</p>
            <p className={styles.unicode}>
              Unicodes: {emojiItem.unicode.join('|')}
            </p>
            <p className={styles.unicode}>
              Html Codes: {emojiItem.htmlCode.join('|')}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};
export { Cards };
