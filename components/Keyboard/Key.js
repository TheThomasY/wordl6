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
      if (props.keyStatus[keyVal] === 2) {
        if (!props.darkMode) {
          setKeyStyle({ backgroundColor: '#6aaa64', color: 'white' });
        } else {
          setKeyStyle({ backgroundColor: '#538d4e', color: 'white' });
        }
      } else if (props.keyStatus[keyVal] === 1) {
        if (!props.darkMode) {
          setKeyStyle({ backgroundColor: '#c9b458', color: 'white' });
        } else {
          setKeyStyle({ backgroundColor: '#b59f3b', color: 'white' });
        }
      } else if (props.keyStatus[keyVal] === 0) {
        if (!props.darkMode) {
          setKeyStyle({ backgroundColor: '#787c7e', color: 'white' });
        } else {
          setKeyStyle({ backgroundColor: '#3a3a3c', color: 'white' });
        }
      }
    }
  }, [props.keyStatus, props.darkMode]);

  const letterClickedHandler = (event) => {
    props.updateBoard(event.currentTarget.id);
  };

  return (
    <button
      onClick={letterClickedHandler}
      className={styles['key'] + ' ' + (props.darkMode ? styles.dark : '')}
      style={keyStyle}
      id={props.keyVal}
    >
      {keyVal}
    </button>
  );
}
