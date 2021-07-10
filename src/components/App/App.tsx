import React, { useState } from 'react';
import styles from './App.module.scss';
import data from './../../questions.json';

function App() {
  const [counter, setCounter] = useState(1);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(shuffle(data.slice(1)));

  const goToNext = () => {
    setCounter(counter + 1);
    setIsAnswerOpen(false);
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const showAnswer = () => {
    setIsAnswerOpen(true);
  };

  const reset = () => {
    setCounter(1);
    setIsAnswerOpen(false);
    setActiveQuestionIndex(0);
    setQuestions(shuffle(questions));
  };

  function shuffle(arr: any[]): any[] {
    const result = arr.slice();

    for (let i = result.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  return (
    <div className={styles.app}>
      <div className={styles.counter}>
        <div className={styles.current}>{counter}</div>/
        <div className={styles.total}>{questions.length}</div>
      </div>
      <div className={styles.appInnerWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{questions[activeQuestionIndex].title}</div>
          {isAnswerOpen && (
            <div className={styles.answer}>
              {questions[activeQuestionIndex].data.map(
                (el: { type: string; content: string }, i: number) => {
                  if (el.type === 'image') {
                    return (
                      <img
                        src={require(`./../../assets/images/${el.content}`).default}
                        alt=""
                        key={i}
                        draggable={false}
                      />
                    );
                  }

                  if (el.type === 'code') {
                    return <p key={i}>{el.content}</p>;
                  }

                  if (el.type === 'link') {
                    return (
                      <a
                        href={el.content}
                        target="_blank"
                        key={i}
                        rel="noreferrer"
                        draggable={false}
                      >
                        {el.content}
                      </a>
                    );
                  }

                  return <p key={i}>{el.content}</p>;
                },
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        {isAnswerOpen || (
          <div className={styles.button} onClick={showAnswer}>
            <i className="fas fa-question"></i>
          </div>
        )}
        {counter === questions.length ? (
          <div className={styles.button} onClick={reset}>
            <i className="fas fa-undo"></i>
          </div>
        ) : (
          <div className={styles.button} onClick={goToNext}>
            <i className="fas fa-angle-right"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
