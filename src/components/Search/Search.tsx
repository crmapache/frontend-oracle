import React from 'react';
import styles from './Search.module.scss';

interface Props {
  onChange: (value: string) => void;
  questionsLength: number;
}

export default function Search({ onChange, questionsLength }: Props) {
  const inputChangeHandler = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.search}
      type="text"
      onChange={inputChangeHandler}
      placeholder={`Search in ${questionsLength} questions...`}
    />
  );
}
