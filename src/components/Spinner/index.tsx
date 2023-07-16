import styles from './Spinner.module.css';
const Spinner = () => (
  <div className={styles['lds-ripple']}>
    <div></div>
    <div></div>
  </div>
);
export { Spinner };
