import React from 'react';

// Css
import styles from './Settings.module.scss';

// React Icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

export default function Settings(props) {
  const toggleSettings = () => {
    props.toggleSettings();
  };

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <div className={styles.help}>
          <BiHelpCircle size={'3rem'} />
        </div>
        <h2>Settings</h2>
        <div onClick={toggleSettings} className={styles.close}>
          <AiOutlineClose size={'2.5rem'} />
        </div>
      </div>
      <ul className={styles['setting-list']}>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Hard Mode</div>
          <BsToggleOff size={'2.5rem'} />
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Dark Theme</div>
          <BsToggleOff size={'2.5rem'} />
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>High Contrast Mode</div>
          <BsToggleOff size={'2.5rem'} />
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Feedback</div>
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Questions</div>
        </li>
      </ul>
    </div>
  );
}
