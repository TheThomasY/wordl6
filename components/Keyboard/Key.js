import React from 'react';

import styles from './Key.module.scss';

export default function Key(props) {
  return (
    <div>
      <button className={styles.key}>{props.keyVal}</button>
    </div>
  );
}
