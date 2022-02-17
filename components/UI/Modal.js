import React, { useState, useEffect } from 'react';

// Css
import styles from './Modal.module.scss';

// React Icons
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineFire } from 'react-icons/ai';

export default function PopUp(props) {
  const toggleStats = () => {
    props.toggleStats();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div onClick={toggleStats} className={styles.close}>
          <AiOutlineClose size={'3rem'} />
        </div>
        <h2>Statistics</h2>
        <div className={styles['modal-content']}>
          <div className={styles['big-streak']}>
            <AiOutlineFire size={'11rem'} />
            <div className={styles['big-streak-val']}>0</div>
            <div className={styles['big-streak-label']}>Current Streak</div>
          </div>
          <div className={styles['small-stats']}>
            <div className={styles['small-stat-block']}>
              <div className={styles['small-val']}>0</div>
              <div className=''>Played</div>
            </div>
            <div className={styles['small-stat-block']}>
              <div className={styles['small-val']}>0</div>
              <div className=''>Win %</div>
            </div>
            <div className={styles['small-stat-block']}>
              <div className={styles['small-val']}>0</div>
              <div className=''>Max Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
