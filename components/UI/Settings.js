import React from 'react';

// Css
import styles from './Settings.module.scss';

// React Icons
import { AiOutlineClose } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';

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
      <div className={styles['setting-list']}></div>
    </div>
  );
}
