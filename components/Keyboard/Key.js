import React from 'react';

import styles from './Key.module.scss';

export default function Key(props) {
  return (
    <button className={styles.key} id={props.keyVal}>
      {props.keyVal}
    </button>
  );
}
