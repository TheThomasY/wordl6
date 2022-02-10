// * React
import React from 'react';

// * External
import { BsArrowReturnLeft, BsBackspace } from 'react-icons/bs';

// * Sass
import styles from './Key.module.scss';

export default function Key(props) {
  let keyVal = props.keyVal;
  let keyStyle = {};

  if (props.keyVal === 'enter') {
    keyVal = <BsArrowReturnLeft />;
    keyStyle = { flexGrow: 1.5, fontSize: '2rem' };
  } else if (props.keyVal === 'back') {
    keyVal = <BsBackspace />;
    keyStyle = { flexGrow: 1.5, fontSize: '2rem' };
  }

  if (props.matches[keyVal] === 0) {
    keyStyle = { backgroundColor: '#3e9f1c', color: 'white' };
  } else if (props.matches[keyVal] === 1) {
    keyStyle = { backgroundColor: '#c39318', color: 'white' };
  } else if (props.matches[keyVal] === -1) {
    keyStyle = { backgroundColor: '#787c7e', color: 'white' };
  }

  const letterClickedHandler = (event) => {
    props.updateBoard(event.currentTarget.id);
  };

  return (
    <button
      onClick={letterClickedHandler}
      className={styles['key']}
      style={keyStyle}
      id={props.keyVal}
    >
      {keyVal}
    </button>
  );
}
