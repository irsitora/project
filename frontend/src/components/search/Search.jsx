import { t } from 'i18next';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.scss';

function Search({ value, onChange }) {
  return (
    <div className={styles.search}>
      <CiSearch size={16} className={styles.icon} />
      <input
        type='text'
        placeholder={`${t('search')}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
