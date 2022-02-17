import React, { useState, useEffect } from 'react';

// Css
import styles from './Modal.module.scss';

export default function PopUp() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.close}>x</div>
        <h2>Statistics</h2>
      </div>
    </div>
  );
}
