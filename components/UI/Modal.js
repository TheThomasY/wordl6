import React, { useState, useEffect } from 'react';

// Css
import styles from './Modal.module.scss';

// React Icons
import { AiOutlineClose } from 'react-icons/ai';

export default function PopUp(props) {
  const toggleStats = () => {
    props.toggleStats();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div onClick={toggleStats} className={styles.close}>
          <AiOutlineClose size={'2rem'} />
        </div>
        <h2>Statistics</h2>
      </div>
    </div>
  );
}
