// * React
import React from 'react';

// * External
import { BsArrowReturnLeft, BsBackspace } from 'react-icons/bs';

// * Sass
import styles from './Key.module.scss';

export default function Key(props) {
  let keyVal = props.keyVal;

  if (props.keyVal === 'enter') {
    keyVal = <BsArrowReturnLeft />;
  }

  if (props.keyVal === 'back') {
    keyVal = <BsBackspace />;
  }

  const letterClickedHandler = (event) => {
    props.updateBoard(event.currentTarget.id);
  };

  return (
    <button
      onClick={letterClickedHandler}
      className={
        styles['key'] +
        ' ' +
        (props.keyVal === 'enter' || props.keyVal === 'back'
          ? styles['function-keys']
          : '')
      }
      id={props.keyVal}
    >
      {keyVal}
    </button>
  );
}
