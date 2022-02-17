import React from 'react';

// Css
import styles from './Settings.module.scss';

// React Icons
import { AiOutlineClose, AiOutlineCopyrightCircle } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';

export default function Settings(props) {
  const toggleSettings = () => {
    props.toggleSettings();
  };

  const toggleDarkMode = () => {
    props.toggleDarkMode();
  };

  return (
    <div
      className={styles.settings + ' ' + (props.darkMode ? styles.dark : '')}
    >
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
          <BsToggleOff size={'2.5rem'} className={styles.toggle} />
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Dark Theme</div>
          <div onClick={toggleDarkMode}>
            {!props.darkMode ? (
              <BsToggleOff size={'2.5rem'} className={styles.toggle} />
            ) : (
              <BsToggleOn size={'2.5rem'} className={styles.toggle} />
            )}
          </div>
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>High Contrast Mode</div>
          <BsToggleOff size={'2.5rem'} className={styles.toggle} />
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Feedback</div>
          <div className={styles.link}>Email</div>
        </li>
        <li className={styles.setting}>
          <div className={styles['setting-label']}>Questions</div>
          <div className={styles.link}>FAQ</div>
        </li>
      </ul>
      <div className={styles.footer}>
        <AiOutlineCopyrightCircle color='grey' />
        <div>2022 Tom Young</div>
      </div>
    </div>
  );
}
