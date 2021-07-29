import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Question from '../Question/Question';
import Fuse from 'fuse.js';
import cn from 'classnames';

import styles from './App.module.scss';
import data from './../../questions.json';

const questionsData = shuffle(data.slice(1));
const fuse = new Fuse(questionsData, {
  keys: ['title', 'tags'],
  findAllMatches: true,
});

export default function App() {
  const [questions, setQuestions] = useState(questionsData);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setQuestions(filterQuestions(questionsData, filter));
  }, [filter]);

  return (
    <div className={styles.app}>
      <div className={styles.searchWrap}>
        <Search onChange={value => setFilter(value)} />
      </div>
      <div className={styles.questionsWrap}>
        {questions.length > 0 ? (
          questions.map((question, i) => <Question question={question} key={i} />)
        ) : (
          <div className={styles.emptyRequiestMessage}>( ‾́ ◡ ‾́ )</div>
        )}
      </div>
    </div>
  );
}

function shuffle(arr: any[]): any[] {
  const result = arr.slice();

  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function filterQuestions(questions: any, filter: string): any {
  if (filter.length < 1) {
    return questions;
  }

  return fuse.search(filter).map(el => el.item);
}
