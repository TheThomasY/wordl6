// * React
import React from 'react';

// * Components
import Key from './Key';

// * Sass
import styles from './Keyboard.module.scss';

export default function Keyboard(props) {
  const letters1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const letters2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const letters3 = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'back'];

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {letters1.map((keyVal) => (
          <Key
            key={keyVal}
            keyVal={keyVal}
            updateBoard={props.updateBoard}
            keyStatus={props.keyStatus}
          />
        ))}
      </div>
      <div className={styles.row}>
        <div className={styles.indent}></div>
        {letters2.map((keyVal) => (
          <Key
            key={keyVal}
            keyVal={keyVal}
            updateBoard={props.updateBoard}
            keyStatus={props.keyStatus}
          />
        ))}
        <div className={styles.indent}></div>
      </div>
      <div className={styles.row}>
        {letters3.map((keyVal) => (
          <Key
            key={keyVal}
            keyVal={keyVal}
            updateBoard={props.updateBoard}
            keyStatus={props.keyStatus}
          />
        ))}
      </div>
    </div>
  );
}
