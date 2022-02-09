import React from 'react';

import styles from './Key.module.scss';

export default function Key(props) {
  const letterClickedHandler = (event) => {
    props.updateBoard(event.target.id);
  };

  return (
    <button
      onClick={letterClickedHandler}
      className={
        styles['key'] +
        ' ' +
        (props.keyVal === '↵' || props.keyVal === '←'
          ? styles['function-keys']
          : '')
      }
      id={props.keyVal}
    >
      {props.keyVal}
    </button>
  );
}
