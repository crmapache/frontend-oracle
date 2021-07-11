import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';
import data from './../../questions.json';

const filters = Array.from(
  data.slice(1).reduce((result, el) => {
    el.tags?.forEach(tag => {
      result.add(tag);
    });

    return result;
  }, new Set()),
);

function App() {
  const [counter, setCounter] = useState(1);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(shuffle(data.slice(1)));
  const [activeFilters, setActiveFilters] = useState<Array<string>>([]);

  useEffect(() => {
    const localFilters = window.localStorage.getItem('filters');

    if (localFilters) {
      try {
        setActiveFilters(JSON.parse(localFilters));
      } catch (e) {
        setActiveFilters([]);
      }
    }
  }, []);

  useEffect(() => {
    if (activeFilters.length < 1) {
      setQuestions(shuffle(data.slice(1)));
    } else {
      setQuestions(
        shuffle(
          data.slice(1).filter(el => {
            for (let i = 0; i < activeFilters.length; i++) {
              if (el.tags?.includes(activeFilters[i])) {
                return true;
              }
            }

            return false;
          }),
        ),
      );
    }

    setCounter(1);
    setActiveQuestionIndex(0);
    setIsAnswerOpen(false);
    window.localStorage.setItem('filters', JSON.stringify(activeFilters));
  }, [activeFilters]);

  const goToNext = () => {
    setCounter(counter + 1);
    setIsAnswerOpen(false);
    setActiveQuestionIndex(activeQuestionIndex + 1);
    setIsFiltersOpen(false);
  };

  const showAnswer = () => {
    setIsAnswerOpen(true);
    setIsFiltersOpen(false);
  };

  const reset = () => {
    setCounter(1);
    setIsAnswerOpen(false);
    setActiveQuestionIndex(0);
    setQuestions(shuffle(questions));
    setIsFiltersOpen(false);
  };

  const toggleFiltersModal = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const toggleFilter = (el: string): void => {
    if (activeFilters.includes(el)) {
      activeFilters.splice(activeFilters.indexOf(el), 1);
    } else {
      activeFilters.push(el);
    }

    setActiveFilters(Array.from(activeFilters));
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
          {questions[activeQuestionIndex].image && (
            <img
              className={styles.questionImage}
              src={require(`./../../assets/images/${questions[activeQuestionIndex].image}`).default}
              alt=""
              draggable={false}
            />
          )}
          {isAnswerOpen && (
            <div className={styles.answer}>
              {questions[activeQuestionIndex].data.map(
                (el: { type: string; content: string | string[] }, i: number) => {
                  if (el.content && typeof el.content === 'string' && el.type === 'image') {
                    return (
                      <img
                        src={require(`./../../assets/images/${el.content}`).default}
                        alt=""
                        key={i}
                        draggable={false}
                      />
                    );
                  }

                  if (el.content && typeof el.content === 'string' && el.type === 'link') {
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

                  if (el.content && Array.isArray(el.content) && el.type === 'list') {
                    return (
                      <div className={styles.list} key={i}>
                        {el.content.map((listEl, listElIndex) => {
                          return (
                            <div className={styles.listItem} key={listElIndex}>
                              {listEl}
                            </div>
                          );
                        })}
                      </div>
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
        <div
          className={cn(styles.button, activeFilters.length > 0 && styles.filtersActive)}
          onClick={toggleFiltersModal}
        >
          <i className="fas fa-filter"></i>
        </div>
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
      {isFiltersOpen && (
        <div className={styles.filtersWrap}>
          {filters.map((el: any) => {
            return (
              <div
                className={cn(styles.filterButton, activeFilters.includes(el) && styles.active)}
                onClick={() => toggleFilter(el)}
                key={el}
              >
                {el}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
