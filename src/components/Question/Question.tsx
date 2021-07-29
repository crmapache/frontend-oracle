import React, { useState, MouseEventHandler, useEffect } from 'react';

import cn from 'classnames';
import styles from './Question.module.scss';

interface Props {
  question: any;
}

export default function Question({ question }: Props) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  useEffect(() => {
    setIsImageOpen(false);
    setIsAnswerOpen(false);
  }, [question]);

  return (
    <div className={styles.question}>
      <div className={styles.head}>
        <div className={styles.title} onClick={() => setIsAnswerOpen(!isAnswerOpen)}>
          {question.title}
        </div>
        <div
          className={cn(styles.imageButton, question.image && styles.active)}
          onClick={() => setIsImageOpen(!isImageOpen)}
        >
          <i className="fas fa-image"></i>
        </div>
      </div>
      {isImageOpen && question.image && (
        <div className={styles.imageWrap}>
          <img
            className={styles.questionImage}
            src={require(`./../../assets/images/${question.image}`).default}
            alt=""
            draggable={false}
          />
        </div>
      )}
      {isAnswerOpen && (
        <div className={styles.answerWrap}>
          {question.data.map((el: { type: string; content: string | string[] }, i: number) => {
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
                <a href={el.content} target="_blank" key={i} rel="noreferrer" draggable={false}>
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
          })}
        </div>
      )}
    </div>
  );
}
