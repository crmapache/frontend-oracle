import React from 'react';
import styles from './Search.module.scss';

interface Props {
  onChange: (value: string) => void;
}

export default function Search({ onChange }: Props) {
  const inputChangeHandler = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.search}
      type="text"
      onChange={inputChangeHandler}
      placeholder="Search..."
    />
  );
}
