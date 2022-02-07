import React from 'react';

import Key from './Key';

import styles from './Keyboard.module.scss';

export default function Keyboard() {
  const letters1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const letters2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const letters3 = ['↵', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'];

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {letters1.map((keyVal) => (
          <Key key={keyVal} keyVal={keyVal} />
        ))}
      </div>
      <div className={styles.secondRow}>
        {letters2.map((keyVal) => (
          <Key key={keyVal} keyVal={keyVal} />
        ))}
      </div>
      <div className={styles.row}>
        {letters3.map((keyVal) => (
          <Key key={keyVal} keyVal={keyVal} />
        ))}
      </div>
    </div>
  );
}
