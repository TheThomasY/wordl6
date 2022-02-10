// * React
import React, { useEffect, useState } from 'react';

// * External
import { BsArrowReturnLeft, BsBackspace } from 'react-icons/bs';

// * Sass
import styles from './Key.module.scss';

export default function Key(props) {
  const [keyVal, setKeyVal] = useState(props.keyVal);
  const [keyStyle, setKeyStyle] = useState({});

  useEffect(() => {
    if (props.keyVal === 'enter') {
      setKeyVal(<BsArrowReturnLeft />);
      setKeyStyle({ flexGrow: 1.5, fontSize: '2rem' });
    } else if (props.keyVal === 'back') {
      setKeyVal(<BsBackspace />);
      setKeyStyle({ flexGrow: 1.5, fontSize: '2rem' });
    }
  }, []);

  useEffect(() => {
    for (let i = 1; i < 7; i++) {
      if (props.matches[i][keyVal] === 0) {
        setKeyStyle({ backgroundColor: '#3e9f1c', color: 'white' });
      } else if (props.matches[i][keyVal] === 1) {
        setKeyStyle({ backgroundColor: '#c39318', color: 'white' });
      } else if (props.matches[i][keyVal] === -1) {
        setKeyStyle({ backgroundColor: '#787c7e', color: 'white' });
      }
    }
  }, [props.matches]);

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
