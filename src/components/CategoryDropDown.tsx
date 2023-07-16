'use client';
import axios from 'axios';
import styles from './CategoryDropDown.module.css';
import useCategoryStore from '@/store/categories';
import { useEffect } from 'react';
import { config } from '@/config';
import { Spinner } from './Spinner';

const getCategories = async (): Promise<string[]> =>
  axios.get<string[]>(`/api/get-categories`).then(({ data }) => data ?? []);

const Categories = () => {
  const {
    category,
    categories,
    setCategories,
    setCategory,
    isLoading,
    skip,
    total,
    setSkip,
    setLoading,
  } = useCategoryStore();
  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((categories) => setCategories(categories))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className={styles.categoryFilter}>
      {!isLoading && (
        <p className={styles.Info}>
          Showing ({skip === 0 ? 1 : skip}-{skip + config.limit}) results of{' '}
          {total} results.
        </p>
      )}
      {!isLoading && skip !== 0 && (
        <button className={styles.myButton} onClick={() => setSkip(false)}>
          Show previous
        </button>
      )}
      {!isLoading && skip < total - config.limit && (
        <button className={styles.myButton} onClick={() => setSkip(true)}>
          Show more
        </button>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export { Categories };
